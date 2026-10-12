/**
 * ============================================================================
 * SFL COMMUNITY API PROXY WORKER (Cloudflare Worker)
 * ============================================================================
 * Script Worker untuk mem-proxy request dari SFL Hub ke Sunflower Land API
 * dengan penanganan header CORS yang benar dan penyisipan x-api-key.
 * ============================================================================
 */

export default {
  async fetch(request, env, _ctx) {
    // 1. Tangani preflight CORS (OPTIONS) untuk browser
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, x-api-key, Authorization",
        },
      });
    }

    try {
      const url = new URL(request.url);
      const targetUrl = `https://api.sunflower-land.com${url.pathname}${url.search}`;
      
      // Ambil API Key dari Environment Variable / Secret worker (SFL_API_KEY)
      const apiKey = env.SFL_API_KEY || "";

      console.log(`[Worker Proxy] Forwarding to: ${targetUrl}`);

      const newHeaders = new Headers(request.headers);
      if (apiKey) {
        newHeaders.set("x-api-key", apiKey);
      }

      const modifiedRequest = new Request(targetUrl, {
        method: request.method,
        headers: newHeaders,
        body: request.method !== "GET" && request.method !== "HEAD" ? request.body : undefined,
        redirect: "follow",
      });

      // Lakukan fetch ke API SFL
      const apiResponse = cloneResponseHeaders(await fetch(modifiedRequest));
      return apiResponse;

    } catch (err) {
      console.error("[Worker Error]:", err);
      return new Response(JSON.stringify({ error: err.message || "Internal Proxy Error" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  },
};

/**
 * Helper untuk menyalin response dan menambahkan header CORS secara aman
 */
function cloneResponseHeaders(response) {
  const newHeaders = new Headers(response.headers);
  newHeaders.set("Access-Control-Allow-Origin", "*");
  newHeaders.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, HEAD");
  newHeaders.set("Access-Control-Allow-Headers", "Content-Type, x-api-key, Authorization");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
