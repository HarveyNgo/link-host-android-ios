// app/.well-known/assetlinks.json/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const pkg = process.env.ANDROID_PACKAGE || "com.b3well.patientportal";
  const certs = (process.env.ANDROID_SHA256_CERTS || "AA:BB:CC:...:99")
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
