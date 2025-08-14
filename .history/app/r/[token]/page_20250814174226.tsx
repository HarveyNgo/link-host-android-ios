// app/r/[token]/page.tsx
"use client";

import { JSX, useEffect, useMemo, useState } from "react";

const IOS_APP_STORE_URL =
  process.env.NEXT_PUBLIC_IOS_APP_URL ||
  "https://apps.apple.com/app/id0000000000";
const ANDROID_PLAY_URL =
  process.env.NEXT_PUBLIC_ANDROID_PLAY_URL ||
  "https://play.google.com/store/apps/details?id=com.b3well.patientportal";

const SCHEME = "b3well"; // must match your app scheme
const WEB_HOST =
  typeof window !== "undefined" ? window.location.host : "localhost:3000";

export default function RegisterPage({
  params,
}: {
  params: { token: string };
}) {
  console.log("hung params:", params);
  const { token } = await params;
    const token = params.token;
  const [isDesktop, setIsDesktop] = useState(false);

  const ua = useMemo(
    () => (typeof navigator !== "undefined" ? navigator.userAgent : ""),
    []
  );
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isMobile = isAndroid || isIOS;

  useEffect(() => {
    if (!isMobile) {
      setIsDesktop(true);
      return;
    }

    if (isAndroid) {
      // Android: intent URL → if no app, Chrome falls back to Play
      const intentUrl =
        `intent://r/${encodeURIComponent(token)}` +
        `#Intent;scheme=${SCHEME};package=com.b3well.patientportal;` +
        `S.browser_fallback_url=${encodeURIComponent(ANDROID_PLAY_URL)};end`;
      window.location.replace(intentUrl);
      return;
    }

    if (isIOS) {
      // iOS: if we’re here, Universal Link likely didn’t open the app.
      // Try scheme once, then store.
      const schemeUrl = `${SCHEME}://r/${encodeURIComponent(token)}`;
      const t = Date.now();
      window.location.href = schemeUrl;

      const toStore = setTimeout(() => {
        if (Date.now() - t < 2500) window.location.replace(IOS_APP_STORE_URL);
      }, 1200);

      //   return () => clearTimeout(toStore);
      return;
    }
  }, [isMobile, isAndroid, isIOS, token]);

  if (isDesktop) {
    const universalUrl = `https://${WEB_HOST}/r/${encodeURIComponent(token)}`;
    return (
      <main style={{ padding: 24, maxWidth: 640, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>Open B3Well App</h1>
        <p>Scan this QR with your phone or send the link to yourself:</p>

        <img
          alt="QR"
          style={{ margin: "16px 0", width: 220, height: 220 }}
          src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
            universalUrl
          )}`}
        />

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

  // Mobile: we’re already navigating to app/store above.
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
