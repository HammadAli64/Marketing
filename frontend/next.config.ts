import type { NextConfig } from "next";

/** Allow Next/Image to load /media/** from the API host(s). Add NEXT_PUBLIC_MEDIA_ORIGIN if media URLs use a different origin than NEXT_PUBLIC_API_URL. */
function mediaRemotePatterns(): Array<{
  protocol: "http" | "https";
  hostname: string;
  port?: string;
  pathname: string;
}> {
  const urls: string[] = [];
  const primary = process.env.NEXT_PUBLIC_API_URL?.trim();
  const extra = process.env.NEXT_PUBLIC_MEDIA_ORIGIN?.trim();
  if (primary) urls.push(primary);
  if (extra) urls.push(extra);
  if (!urls.length) urls.push("http://127.0.0.1:8000");

  const patterns: Array<{
    protocol: "http" | "https";
    hostname: string;
    port?: string;
    pathname: string;
  }> = [];
  const seen = new Set<string>();
  for (const raw of urls) {
    try {
      const url = new URL(raw);
      const key = `${url.protocol}//${url.host}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const protocol = (url.protocol.replace(":", "") as "http" | "https") || "http";
      const port = url.port;
      patterns.push({
        protocol,
        hostname: url.hostname,
        ...(port ? { port } : {}),
        pathname: "/media/**",
      });
    } catch {
      /* skip */
    }
  }
  return patterns.length
    ? patterns
    : [
        {
          protocol: "http",
          hostname: "127.0.0.1",
          port: "8000",
          pathname: "/media/**",
        },
      ];
}

const unsplashPattern = {
  protocol: "https" as const,
  hostname: "images.unsplash.com",
  pathname: "/**",
};

/** CMS uploads via Cloudinary (django-cloudinary-storage). */
const cloudinaryPattern = {
  protocol: "https" as const,
  hostname: "res.cloudinary.com",
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
    remotePatterns: [...mediaRemotePatterns(), unsplashPattern, cloudinaryPattern],
  },
  /**
   * Dev (webpack) on Windows: polling avoids flaky watchers on Desktop/OneDrive/AV-scanned trees
   * and reduces races writing `.next/static/development/_buildManifest.js.tmp.*`.
   */
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
