import type { NextConfig } from "next";

function mediaRemotePattern(): {
  protocol: "http" | "https";
  hostname: string;
  port?: string;
  pathname: string;
} {
  try {
    const url = new URL(
      process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
    );
    const protocol = (url.protocol.replace(":", "") as "http" | "https") || "http";
    const port = url.port;
    return {
      protocol,
      hostname: url.hostname,
      ...(port ? { port } : {}),
      pathname: "/media/**",
    };
  } catch {
    return {
      protocol: "http",
      hostname: "127.0.0.1",
      port: "8000",
      pathname: "/media/**",
    };
  }
}

const unsplashPattern = {
  protocol: "https" as const,
  hostname: "images.unsplash.com",
  pathname: "/**",
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /** DevTools segment explorer can race with HMR on some setups; leave off unless you need it. */
  experimental: {
    devtoolSegmentExplorer: false,
  },
  /** Calmer terminal + browser in dev (compile still prints on error). */
  devIndicators: false,
  logging: {
    incomingRequests: false,
    fetches: { fullUrl: false, hmrRefreshes: false },
  },
  images: {
    remotePatterns: [mediaRemotePattern(), unsplashPattern],
  },
  /**
   * Dev: keep webpack’s default cache. Setting `cache = false` on Windows has been observed to
   * produce broken `.next` output (e.g. MODULE_NOT_FOUND for `vendor-chunks/@swc.js`), which
   * surfaces as missing CSS/JS in the browser. If `.next` ever looks corrupt, run `npm run dev:fresh`.
   */
  webpack: (config, { dev }) => {
    if (dev) {
      config.infrastructureLogging = { level: "error" };
      if (config.output && typeof config.output === "object") {
        (config.output as { chunkLoadTimeout?: number }).chunkLoadTimeout = 120_000;
      }
    }
    return config;
  },
};

export default nextConfig;
