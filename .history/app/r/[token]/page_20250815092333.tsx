/* eslint-disable @next/next/no-async-client-component */
// app/r/[token]/page.tsx
"use client";

import Image from "next/image";
import React from "react";
import { JSX, useEffect, useMemo, useState } from "react";

const IOS_APP_STORE_URL =
  process.env.NEXT_PUBLIC_IOS_APP_URL ||
  "https://apps.apple.com/app/id0000000000";
const ANDROID_PLAY_URL =
  process.env.NEXT_PUBLIC_ANDROID_PLAY_URL ||
  "https://play.google.com/store/apps/details?id=com.b3well.patientportal.dev";

const SCHEME = "b3well"; // must match your app scheme
const WEB_HOST =
  typeof window !== "undefined" ? window.location.host : "localhost:3000";

function buildAndroidIntentUrl(opts: {
  scheme: string; // e.g. 'b3well'
  host: string; // e.g. 'r'  (so final deep link becomes b3well://r/<token>)
  path?: string; // e.g. '/abc123'  (include leading slash if present)
  packageName?: string; // e.g. 'com.b3well.patientportal' (recommended)
  fallbackUrl?: string; // Play Store or your site; MUST be URL-encoded
}) {
  const { scheme, host, path = "/", packageName, fallbackUrl } = opts;

  // Chrome intent syntax:
  // intent://<host><path>#Intent;scheme=<scheme>;package=<pkg>;S.browser_fallback_url=<encoded>;end
  const parts = [
    `intent://${host}${path}#Intent`,
    `scheme=${scheme}`,
    packageName ? `package=${packageName}` : null,
    fallbackUrl
      ? `S.browser_fallback_url=${encodeURIComponent(fallbackUrl)}`
      : null,
    `end`,
  ].filter(Boolean);

  return parts.join(";");
}

function RegisterPageClient({ token }: { token: string }) {
  const [platform, setPlatform] = React.useState<"android" | "ios" | "desktop">(
    "desktop"
  );
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const isAndroid = true; ///Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  console.log("hung isAndroid:", isAndroid);
  console.log("hung isIOS:", isIOS);

  React.useEffect(() => {
    if (isAndroid) {
      setPlatform("android");
      console.log("hung alalal");
      //   const intentUrl =
      //     `intent://r/` +
      //     `#Intent;scheme=${SCHEME};package=com.b3well.patientportal.dev;` +
      //     `S.browser_fallback_url=${encodeURIComponent(ANDROID_PLAY_URL)};end`;
      //   console.log("hungaskdklfksl;dfkl;sdkfl;k l;sdkfl;sdkfl;k");

    //   const intentUrl = buildAndroidIntentUrl({
    //     scheme: "b3well",
    //     host: "r",
    //     // path: `/${encodeURIComponent(token)}`,
    //     path: "/",
    //     packageName: "com.b3well.patientportal.dev",
    //     fallbackUrl:
    //       "https://play.google.com/store/apps/details?id=com.b3well.patientportal.dev",
    //   });

    //   window.location.href = intentUrl;
      //   alert("hung intentUrl: " + intentUrl);
      //   window.location.replace(intentUrl);
      // Try to open the app via deep link
      // window.location.href = `b3well://r/${encodeURIComponent(token)}`;

      // // If the app is not installed, after a short delay, redirect to Google Play Store
      // setTimeout(() => {
      //   window.location.replace(
      //     "https://play.google.com/store/apps/details?id=com.b3well.patientportal.dev"
      //   );
      // }, 1200);
    } else if (isIOS) {
      setPlatform("ios");
      const schemeUrl = `${SCHEME}://r/${encodeURIComponent(token)}`;
      const t = Date.now();
      window.location.href = schemeUrl;

      setTimeout(() => {
        if (Date.now() - t < 2500) window.location.replace(IOS_APP_STORE_URL);
      }, 1200);
    } else {
      setPlatform("desktop");
    }
  }, [isAndroid, isIOS, token]);

  if (platform === "android" || platform === "ios") {
    return (
      <main style={{ padding: 24 }}>
        <h1 style={{ fontSize: 22, marginBottom: 8 }}>Opening the app…</h1>
        <p>
          If nothing happens, install on{" "}
          <a href={ANDROID_PLAY_URL}>Google Play</a> or{" "}
          <a href={IOS_APP_STORE_URL}>the App Store</a>.
        </p>
      </main>
    );
  }

  // Desktop
  const universalUrl = `https://${WEB_HOST}/r/${encodeURIComponent(token)}`;
  return (
    <main style={{ padding: 24, maxWidth: 640, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Open B3Well App</h1>
      <p>Scan this QR with your phone or send the link to yourself:</p>

      {/* <Image
        alt="QR"
        style={{ margin: "16px 0", width: 220, height: 220 }}
        src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
          universalUrl
        )}`}
        width={220}
        height={220}
      /> */}

      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <a href={`sms:&body=${encodeURIComponent(universalUrl)}`}>
          Text me the link
        </a>
        <a
          href={`mailto:?subject=Your%20registration%20link&body=${encodeURIComponent(
            universalUrl
          )}`}
        >
          Email me the link
        </a>
      </div>

      <hr style={{ margin: "24px 0" }} />
      <h3>Store links</h3>
      <ul>
        <li>
          <a href={IOS_APP_STORE_URL}>Download on the App Store (iOS)</a>
        </li>
        <li>
          <a href={ANDROID_PLAY_URL}>Get it on Google Play (Android)</a>
        </li>
      </ul>
    </main>
  );
}

export default async function RegisterPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = await params;
  console.log("hung token:", token);
  return <RegisterPageClient token={token} />;
}
