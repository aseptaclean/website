export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const lastSegment = url.pathname.split("/").pop() ?? "";

    if (url.pathname.endsWith("/")) {
      url.pathname += "index.html";
    } else if (!lastSegment.includes(".")) {
      url.pathname += "/index.html";
    }

    return env.ASSETS.fetch(new Request(url, request));
  }
};
