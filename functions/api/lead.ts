import {
  callbackWindow,
  json,
  safeFileName,
  sha256,
  validateLead,
  type DeliveryState,
  type LeadEnvironment,
  type LeadRecord
} from "../_lib/lead";
import {
  sendCustomerEmail,
  sendOwnerFallbackEmail,
  sendOwnerSms,
  syncHubSpot,
  verifyTurnstile
} from "../_lib/providers";

interface FunctionContext {
  request: Request;
  env: LeadEnvironment;
  waitUntil(promise: Promise<unknown>): void;
}

const recordKey = (id: string) => `leads/${id}/submission.json`;
const status = (state: DeliveryState, detail?: string) => ({
  state,
  at: new Date().toISOString(),
  ...(detail ? { detail: detail.slice(0, 500) } : {})
});

const allowedOrigin = (request: Request, env: LeadEnvironment) => {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const requestOrigin = new URL(request.url).origin;
  const allowed = new Set([
    requestOrigin,
    "https://aseptaclean.com",
    "https://www.aseptaclean.com",
    ...(env.ALLOWED_ORIGINS ?? "").split(",").map((item) => item.trim())
  ]);
  return allowed.has(origin);
};

const persist = (env: LeadEnvironment, lead: LeadRecord) =>
  env.LEAD_UPLOADS.put(recordKey(lead.id), JSON.stringify(lead), {
    httpMetadata: { contentType: "application/json" },
    customMetadata: { recordType: "aseptaclean-lead", leadId: lead.id }
  });

export async function onRequestPost(context: FunctionContext) {
  const { request, env } = context;
  if (!allowedOrigin(request, env)) {
    return json({ ok: false, message: "Submission origin was not accepted." }, 403);
  }
  if (!env.LEAD_UPLOADS || !env.TURNSTILE_SECRET_KEY) {
    return json(
      {
        ok: false,
        message:
          "Online submission is temporarily unavailable. Please call Aseptaclean."
      },
      503
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 80 * 1024 * 1024) {
    return json({ ok: false, message: "The upload is larger than 80 MB." }, 413);
  }

  const remoteIp = request.headers.get("cf-connecting-ip") ?? "";
  if (env.LEAD_RATE_LIMIT && remoteIp) {
    const rateKey = `rate:${await sha256(remoteIp)}`;
    const prior = Number((await env.LEAD_RATE_LIMIT.get(rateKey)) ?? 0);
    if (prior >= 5) {
      return json(
        {
          ok: false,
          message: "Too many attempts were received. Please wait and try again."
        },
        429,
        { "retry-after": "900" }
      );
    }
    await env.LEAD_RATE_LIMIT.put(rateKey, String(prior + 1), {
      expirationTtl: 900
    });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ ok: false, message: "The submitted form could not be read." }, 400);
  }
  const validation = validateLead(formData);
  if (Object.keys(validation.errors).length) {
    return json(
      {
        ok: false,
        message: "Review the highlighted information and submit again.",
        errors: validation.errors
      },
      422
    );
  }

  const token = String(validation.data["cf-turnstile-response"] ?? "");
  if (!(await verifyTurnstile(env, token, remoteIp))) {
    return json(
      {
        ok: false,
        message: "Security verification expired or failed. Complete it again."
      },
      400
    );
  }

  const idempotencyKey = String(validation.data.idempotency_key);
  const dedupeHash = await sha256(idempotencyKey);
  const dedupeKey = `dedupe/${dedupeHash}.json`;
  const existing = await env.LEAD_UPLOADS.get(dedupeKey);
  if (existing) {
    const prior = await existing.json<{
      submissionId: string;
      callbackWindow: LeadRecord["callbackWindow"];
    }>();
    return json({
      ok: true,
      duplicate: true,
      submissionId: prior.submissionId,
      callbackWindow: prior.callbackWindow,
      confirmationEmailSent: false
    });
  }

  const id = crypto.randomUUID();
  const receivedAt = new Date().toISOString();
  const lead: LeadRecord = {
    id,
    receivedAt,
    callbackWindow: callbackWindow(new Date(receivedAt)),
    data: Object.fromEntries(
      Object.entries(validation.data).filter(
        ([key]) =>
          !["cf-turnstile-response", "idempotency_key"].includes(key)
      )
    ),
    files: [],
    delivery: {
      coreStorage: status("pending"),
      uploads: status(validation.files.length ? "pending" : "skipped"),
      hubspot: status("pending"),
      customerEmail: status("pending"),
      ownerSms: status("pending"),
      ownerFallbackEmail: status("pending")
    }
  };

  try {
    lead.delivery.coreStorage = status("succeeded");
    await persist(env, lead);
  } catch {
    return json(
      {
        ok: false,
        message:
          "We could not safely store the request. Your answers remain here. Please try again or call Aseptaclean."
      },
      503
    );
  }

  try {
    for (const [index, file] of validation.files.entries()) {
      const key = `leads/${id}/uploads/${String(index + 1).padStart(2, "0")}-${safeFileName(file.name)}`;
      await env.LEAD_UPLOADS.put(key, await file.arrayBuffer(), {
        httpMetadata: { contentType: file.type },
        customMetadata: {
          leadId: id,
          originalName: file.name.slice(0, 250),
          private: "true"
        }
      });
      lead.files.push({
        key,
        originalName: file.name.slice(0, 250),
        contentType: file.type,
        size: file.size
      });
    }
    lead.delivery.uploads = status(
      validation.files.length ? "succeeded" : "skipped",
      validation.files.length
        ? `${validation.files.length} private file(s) stored.`
        : "No files supplied."
    );
    await persist(env, lead);
    await env.LEAD_UPLOADS.put(
      dedupeKey,
      JSON.stringify({
        submissionId: id,
        callbackWindow: lead.callbackWindow,
        receivedAt
      }),
      { httpMetadata: { contentType: "application/json" } }
    );
  } catch {
    lead.delivery.uploads = status("failed", "Private upload storage failed.");
    try {
      await persist(env, lead);
    } catch {
      // The original recoverable core record remains in R2.
    }
    return json(
      {
        ok: false,
        message:
          "We stored the request details but could not safely store the selected files. Your answers remain here. Remove the files and try again, or call Aseptaclean."
      },
      503
    );
  }

  const runStep = async (
    name: keyof LeadRecord["delivery"],
    operation: () => Promise<{ skipped: boolean; detail: string }>
  ) => {
    try {
      const result = await operation();
      lead.delivery[name] = status(
        result.skipped ? "skipped" : "succeeded",
        result.detail
      );
      return result;
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Provider failed.";
      lead.delivery[name] = status("failed", detail);
      return { skipped: false, detail, failed: true };
    } finally {
      await persist(env, lead);
    }
  };

  await Promise.all([
    runStep("hubspot", () => syncHubSpot(env, lead)),
    runStep("customerEmail", () => sendCustomerEmail(env, lead))
  ]);
  const sms = await runStep("ownerSms", () => sendOwnerSms(env, lead));
  if ("failed" in sms || sms.skipped) {
    await runStep("ownerFallbackEmail", () =>
      sendOwnerFallbackEmail(env, lead, sms.detail)
    );
  } else {
    lead.delivery.ownerFallbackEmail = status(
      "skipped",
      "SMS delivered; fallback was not required."
    );
    await persist(env, lead);
  }

  return json(
    {
      ok: true,
      submissionId: id,
      callbackWindow: lead.callbackWindow,
      confirmationEmailSent:
        lead.delivery.customerEmail?.state === "succeeded"
    },
    201
  );
}

export function onRequestGet() {
  return json({ ok: false, message: "Method not allowed." }, 405, {
    allow: "POST"
  });
}
