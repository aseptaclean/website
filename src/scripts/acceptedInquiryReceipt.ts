const RECEIPT_KEY = "aseptaclean:accepted-inquiry-receipt";
const CONFIRMATION_CODE = /^AC-[0-9A-HJKMNP-TV-Z]{6}$/;

export interface AcceptedInquiryReceipt {
  version: 1;
  accepted: true;
  confirmationCode?: string;
}

/**
 * Persist a same-tab receipt only after the caller has established that /api/lead
 * returned a successful response with `ok: true`. Submitted fields never enter the
 * receipt; the optional reference is copied from the backend response.
 */
export const storeAcceptedInquiryReceipt = (
  payload: Record<string, unknown>
): boolean => {
  if (payload.ok !== true) return false;

  const candidate =
    typeof payload.confirmationCode === "string"
      ? payload.confirmationCode
      : "";
  const receipt: AcceptedInquiryReceipt = {
    version: 1,
    accepted: true,
    ...(CONFIRMATION_CODE.test(candidate)
      ? { confirmationCode: candidate }
      : {})
  };

  try {
    window.sessionStorage.setItem(RECEIPT_KEY, JSON.stringify(receipt));
    return true;
  } catch {
    return false;
  }
};

export const readAcceptedInquiryReceipt = (): AcceptedInquiryReceipt | null => {
  try {
    const stored = window.sessionStorage.getItem(RECEIPT_KEY);
    if (!stored) return null;
    const receipt = JSON.parse(stored) as Partial<AcceptedInquiryReceipt>;
    if (receipt.version !== 1 || receipt.accepted !== true) return null;
    if (
      receipt.confirmationCode !== undefined &&
      !CONFIRMATION_CODE.test(receipt.confirmationCode)
    ) {
      return null;
    }
    return receipt as AcceptedInquiryReceipt;
  } catch {
    return null;
  }
};
