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
const PACKAGE_NAME = "com.b3well.patientportal.dev";

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
    `intent://${host}${path}#Intent;`,
    `scheme=${scheme}`,
    packageName ? `package=${packageName}` : null,
    fallbackUrl
      ? `S.browser_fallback_url=${encodeURIComponent(fallbackUrl)}`
      : null,
    `end`,
  ].filter(Boolean);

  return parts.join(";");
}

function RegisterPageClient({ key }: { key: string }) {
  const [platform, setPlatform] = React.useState<"android" | "ios" | "desktop">(
    "desktop"
  );
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  console.log("hung isAndroid:", isAndroid);
  console.log("hung isIOS:", isIOS);
  //   const intentUrl = buildAndroidIntentUrl({
  //     scheme: "b3well",
  //     host: "r",
  //     path: `/${encodeURIComponent(token)}`,
  //     // path: "/",
  //     packageName: "com.b3well.patientportal.dev",
  //     fallbackUrl:
  //       "https://play.google.com/store/apps/details?id=com.b3well.patientportal.dev",
  //   });
  //   console.log("hung intentUrl:", intentUrl);

  // React.useEffect(() => {
  //   if (isAndroid) {
  //     setPlatform("android");
  //     console.log("hung alalal");
  //     // window.location.href = `b3well://r/${encodeURIComponent(
  //     //   key
  //     // )}&email=email&domain=accounts.development.b3well.com/realms/b3well/login-actions/action-token`;
  //     window.location.href = `b3well://url={https://accounts.development.b3well.com/realms/b3well/login-actions/action-token?key=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFncU52azJUU1o0YWRhWndnT3Y3UDJMenpqa3ZLdnRDLUR0am9fazBxb00ifQ.eyJqdGkiOiJlOGY0ZDcxNy04MTRmLTRjMjEtOWM0NS1mZjIzYTJlZDRkNjciLCJpc3MiOiJodHRwczovL2FjY291bnRzLmRldmVsb3BtZW50LmIzd2VsbC5jb20vcmVhbG1zL2Izd2VsbCIsImF1ZCI6Imh0dHBzOi8vYWNjb3VudHMuZGV2ZWxvcG1lbnQuYjN3ZWxsLmNvbS9yZWFsbXMvYjN3ZWxsIiwic3ViIjoiZGViMWEzNmYtNDc5My00NGViLWEzZWYtNmRlZDUzMzk2ZWJlIiwidHlwIjoiZXhlY3V0ZS1hY3Rpb25zIiwiYXpwIjoicHJvdmlkZXItcG9ydGFsIiwibm9uY2UiOiJmNzVhZjllZC0zYjRkLTQ4NzQtYmViOC0zYzYyYWQxNGM3ZDMiLCJlbWwiOiJ6aXBlaXNzb21tb2xsYXUtMTI0NEB5b3BtYWlsLmNvbSIsInJxYWMiOlsiVVBEQVRFX1BBU1NXT1JEIl0sImlhdCI6MTc1NTc2NjY2MywicmVkdXJpIjoiaHR0cHM6Ly9wcm92aWRlci5kZXZlbG9wbWVudC5iM3dlbGwuY29tIiwiZXhwIjoxNzU1ODUzMDYzfQ.NNovf5FhQ6OYpwCbr0bjDY-33CgRxHjGfSRL6HPPcvCeg1OLuvW6TBkRNemPAbA-u_mTA3vrOjkK3UiY3dI76o4_rK_dWIyPJk5zfDK8AupOgRXLBgHOYrKlBS_LOc310pnnh7HCqW4hmxeGaEumB6Y-favKWYq6w4NbayVqY3jDZMWLNbN_RhltCnXrBAwmEU7wkDUq-LBC_3q95CXCR5fTywJV8R04fpumwITf7vOz6nLoZKtuOStke8F36UGreTlnWiO7UYCJppDcTvlz29VRNqKiSp8fprrAtrxvoRODsk0FBOvNUTTBD_xjhTDXk1DqFxDKfOKaC2I3aD2jvg&email=zipeissommollau-1244%40yopmail.com"t(
  //     //   const intentUrl =
  //     //     `intent://r/` +
  //     //     `#Intent;scheme=${SCHEME};package=com.b3well.patientportal.dev;` +
  //     //     `S.browser_fallback_url=${encodeURIComponent(ANDROID_PLAY_URL)};end`;
  //     //   console.log("hungaskdklfksl;dfkl;sdkfl;k l;sdkfl;sdkfl;k");

  //     //   const intentUrl = buildAndroidIntentUrl({
  //     //     scheme: "b3well",
  //     //     host: "r",
  //     //     path: `/${encodeURIComponent(token)}`,
  //     //     // path: "/",
  //     //     packageName: "com.b3well.patientportal.dev",
  //     //     fallbackUrl:
  //     //       "https://play.google.com/store/apps/details?id=com.b3well.patientportal.dev",
  //     //   });
  //     //   window.location.href = intentUrl;
  //     //   alert("hung intentUrl: " + intentUrl);
  //     //   window.location.replace(intentUrl);
  //     //   window.location.replace(
  //     //     "https://play.google.com/store/apps/details?id=com.facebook.katana"
  //     //   );
  //     // Try to open the app via deep link
  //     //   window.location.replace(`b3well://r/${encodeURIComponent(token)}`);
  //     // window.location.replace(
  //     //   `${SCHEME}://active-account/${encodeURIComponent(token)}`
  //     // );
  //     // If the app is not installed, after a short delay, redirect to Google Play Store
  //     setTimeout(() => {
  //       window.location.replace(
  //         `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}`
  //       );
  //     }, 1200);
  //   } else if (isIOS) {
  //     setPlatform("ios");
  //     const schemeUrl = `${SCHEME}://r/${encodeURIComponent(token)}`;
  //     const t = Date.now();
  //     window.location.href = schemeUrl;

  //     setTimeout(() => {
  //       if (Date.now() - t < 2500) window.location.replace(IOS_APP_STORE_URL);
  //     }, 1200);
  //   } else {
  //     setPlatform("desktop");
  //   }
  // }, [isAndroid, isIOS, token]);

    React.useEffect(() => {
    if (isAndroid) {
    
    
      // window.location.href = `b3well://r/${encodeURIComponent(
      //   key
      // )}&email=email&domain=accounts.development.b3well.com/realms/b3well/login-actions/action-token`;
      window.location.href = `b3well://url={https://accounts.development.b3well.com/realms/b3well/login-actions/action-token?key=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFncU52azJUU1o0YWRhWndnT3Y3UDJMenpqa3ZLdnRDLUR0am9fazBxb00ifQ.eyJqdGkiOiJlOGY0ZDcxNy04MTRmLTRjMjEtOWM0NS1mZjIzYTJlZDRkNjciLCJpc3MiOiJodHRwczovL2FjY291bnRzLmRldmVsb3BtZW50LmIzd2VsbC5jb20vcmVhbG1zL2Izd2VsbCIsImF1ZCI6Imh0dHBzOi8vYWNjb3VudHMuZGV2ZWxvcG1lbnQuYjN3ZWxsLmNvbS9yZWFsbXMvYjN3ZWxsIiwic3ViIjoiZGViMWEzNmYtNDc5My00NGViLWEzZWYtNmRlZDUzMzk2ZWJlIiwidHlwIjoiZXhlY3V0ZS1hY3Rpb25zIiwiYXpwIjoicHJvdmlkZXItcG9ydGFsIiwibm9uY2UiOiJmNzVhZjllZC0zYjRkLTQ4NzQtYmViOC0zYzYyYWQxNGM3ZDMiLCJlbWwiOiJ6aXBlaXNzb21tb2xsYXUtMTI0NEB5b3BtYWlsLmNvbSIsInJxYWMiOlsiVVBEQVRFX1BBU1NXT1JEIl0sImlhdCI6MTc1NTc2NjY2MywicmVkdXJpIjoiaHR0cHM6Ly9wcm92aWRlci5kZXZlbG9wbWVudC5iM3dlbGwuY29tIiwiZXhwIjoxNzU1ODUzMDYzfQ.NNovf5FhQ6OYpwCbr0bjDY-33CgRxHjGfSRL6HPPcvCeg1OLuvW6TBkRNemPAbA-u_mTA3vrOjkK3UiY3dI76o4_rK_dWIyPJk5zfDK8AupOgRXLBgHOYrKlBS_LOc310pnnh7HCqW4hmxeGaEumB6Y-favKWYq6w4NbayVqY3jDZMWLNbN_RhltCnXrBAwmEU7wkDUq-LBC_3q95CXCR5fTywJV8R04fpumwITf7vOz6nLoZKtuOStke8F36UGreTlnWiO7UYCJppDcTvlz29VRNqKiSp8fprrAtrxvoRODsk0FBOvNUTTBD_xjhTDXk1DqFxDKfOKaC2I3aD2jvg&email=zipeissommollau-1244%40yopmail.com"t(
      //   const intentUrl =
      //     `intent://r/` +
      //     `#Intent;scheme=${SCHEME};package=com.b3well.patientportal.dev;` +
      //     `S.browser_fallback_url=${encodeURIComponent(ANDROID_PLAY_URL)};end`;
      //   console.log("hungaskdklfksl;dfkl;sdkfl;k l;sdkfl;sdkfl;k");

      //   const intentUrl = buildAndroidIntentUrl({
      //     scheme: "b3well",
      //     host: "r",
      //     path: `/${encodeURIComponent(token)}`,
      //     // path: "/",
      //     packageName: "com.b3well.patientportal.dev",
      //     fallbackUrl:
      //       "https://play.google.com/store/apps/details?id=com.b3well.patientportal.dev",
      //   });
      //   window.location.href = intentUrl;
      //   alert("hung intentUrl: " + intentUrl);
      //   window.location.replace(intentUrl);
      //   window.location.replace(
      //     "https://play.google.com/store/apps/details?id=com.facebook.katana"
      //   );
      // Try to open the app via deep link
      //   window.location.replace(`b3well://r/${encodeURIComponent(token)}`);
      // window.location.replace(
      //   `${SCHEME}://active-account/${encodeURIComponent(token)}`
      // );
      // If the app is not installed, after a short delay, redirect to Google Play Store
      setTimeout(() => {
        window.location.replace(
          `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}`
        );
      }, 1200);
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

export default async function ActiveAccountPage({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<JSX.Element> {
  const { key } = await params;
  console.log("hung key:", key);
  return <RegisterPageClient token={key} />;
  //   return null;
}
