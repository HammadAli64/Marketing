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
  /**
   * Avoids dev-only errors: "SegmentViewNode ... not in the React Client Manifest" and
   * `__webpack_modules__[moduleId] is not a function` when webpack HMR + next-devtools race
   * (common with `webpack.cache = false` on Windows). Re-enable if you need the segment tree UI.
   */
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
   * Webpack dev only (default `npm run dev`). Disables persistent cache on Windows so `.next`
   * does not end up half-written (ENOENT manifests / *.tmp build files) when HMR races or AV locks files.
   */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
      config.infrastructureLogging = { level: "error" };
    }
    return config;
  },
};

export default nextConfig;
