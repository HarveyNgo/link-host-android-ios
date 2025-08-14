// app/.well-known/assetlinks.json/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const pkg = process.env.ANDROID_PACKAGE || "com.b3well.patientportal.dev";
  const certs = (
    process.env.ANDROID_SHA256_CERTS ||
    "FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C"
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const data = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: pkg,
        sha256_cert_fingerprints: certs,
      },
    },
  ];

  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300, must-revalidate",
    },
  });
}
