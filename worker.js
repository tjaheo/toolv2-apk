/**
 * ============================================================================
 * SFL COMMUNITY API PROXY WORKER (Cloudflare Worker)
 * ============================================================================
 * Proxy worker yang meneruskan request ke Sunflower Land API dan menyertakan 
 * header CORS "*" serta x-api-key secara aman.
 * ============================================================================
 */

export default {
  async fetch(request, env, _ctx) {
    // 1. Tangani preflight CORS (OPTIONS) untuk semua origin
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
      
      // Ambil base URL dari env atau default ke SFL API
      const apiBase = env.SFL_API_BASE || "https://api.sunflower-land.com";
      const targetUrl = `${apiBase}${url.pathname}${url.search}`;
      
      // Ambil Secret API Key
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

      const response = await fetch(modifiedRequest);
      
      // Buat response baru dengan menyertakan Access-Control-Allow-Origin: *
      const newHeadersResponse = new Headers(response.headers);
      newHeadersResponse.set("Access-Control-Allow-Origin", "*");
      newHeadersResponse.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, HEAD");
      newHeadersResponse.set("Access-Control-Allow-Headers", "Content-Type, x-api-key, Authorization");

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeadersResponse,
      });

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
