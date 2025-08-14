// app/apple-app-site-association/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const bundle = process.env.IOS_BUNDLE_ID || "com.b3well.patientportal";
  const team = process.env.APPLE_TEAM_ID || "TEAMID";
  let paths: string[] = ["/r/*"];
  try {
    if (process.env.AASA_PATHS) paths = JSON.parse(process.env.AASA_PATHS);
  } catch {}

  const data = {
    applinks: {
      apps: [],
      details: [
        {
          appID: `${team}.${bundle}`,
          paths,
        },
      ],
    },
  };

  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // Apple requires no redirects; this route serves directly.
      "Cache-Control": "public, max-age=300, must-revalidate",
    },
  });
}
