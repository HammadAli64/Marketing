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
   * Persistent webpack filesystem cache under `.next/cache/webpack` often corrupts on Windows
   * (cloud sync, antivirus, or deleting `.next` while `next dev` is running). Disabling it in
   * dev avoids ENOENT pack.gz / missing middleware-manifest cascades. Production `next build`
   * is unchanged.
   */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
      config.infrastructureLogging = { level: "error" };
      config.stats = "errors-warnings";
    }
    return config;
  },
};

export default nextConfig;
