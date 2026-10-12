/**
 * ============================================================================
 * SFL COMMUNITY API PROXY WORKER (Cloudflare Worker)
 * ============================================================================
 * Membaca environment variables dari Cloudflare:
 * - SFL_API_BASE (Base URL API SFL)
 * - ALLOW_ORIGINS & ALLOW_ORIGINS_PUBLISH (Pengaturan CORS)
 * - SFL_API_KEY (Secret API Key SFL)
 * ============================================================================
 */

export default {
  async fetch(request, env, _ctx) {
    const origin = request.headers.get("Origin") || "*";
    
    // Kumpulkan daftar origin yang diizinkan dari environment variables Cloudflare
    const allowedOrigins = [
      env.ALLOW_ORIGINS,
      env.ALLOW_ORIGINS_PUBLISH,
      "https://ais-dev-5vgrrlfooqsvamwa3hqfkv-812352267250.asia-southeast1.run.app",
      "https://ais-pre-5vgrrlfooqsvamwa3hqfkv-812352267250.asia-southeast1.run.app"
    ].filter(Boolean);

    // Tentukan apakah origin request diizinkan
    const corsOrigin = allowedOrigins.some(o => origin.includes(o)) ? origin : "*";

    // 1. Tangani preflight CORS (OPTIONS)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": corsOrigin,
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, x-api-key, Authorization",
        },
      });
    }

    try {
      const url = new URL(request.url);
      
      // Gunakan SFL_API_BASE dari Cloudflare Environment Variables
      const apiBase = env.SFL_API_BASE || "https://api.sunflower-land.com";
      const targetUrl = `${apiBase}${url.pathname}${url.search}`;
      
      // Ambil secret SFL_API_KEY dari Cloudflare
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
      
      const newHeadersResponse = new Headers(response.headers);
      newHeadersResponse.set("Access-Control-Allow-Origin", corsOrigin);
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
          "Access-Control-Allow-Origin": corsOrigin,
        },
      });
    }
  },
};
