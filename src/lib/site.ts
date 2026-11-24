const deploymentHost = process.env.VERCEL_URL ?? "portfolio-nicolasalobo.vercel.app";

export const siteOrigin = "https://" + deploymentHost;
export const siteUrl = new URL(siteOrigin);
