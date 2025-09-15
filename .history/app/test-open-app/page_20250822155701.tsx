"use client";
import React from "react";
import { JSX } from "react";

function RegisterPageClient({ key }: { key: string }) {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  console.log("hung isAndroid:", isAndroid);
  console.log("hung isIOS:", isIOS);

  React.useEffect(() => {
    if (isAndroid) {
      window.location.href = `b3well-patient-development://login?url=https://link-host.vercel.app/test-open-app`;
    } else if (isIOS) {
      window.location.href = `b3well-patient-development://login?url=https://link-host.vercel.app/test-open-app`;
    } else {
    }
  }, [isAndroid, isIOS]);

  return (
    <main style={{ padding: 24, maxWidth: 640, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Open B3Well App</h1>
      <p>Scan this QR with your phone or send the link to yourself:</p>
    </main>
  );
}

export default async function ActiveAccountPage({
  params,
}: {
  params: Promise<{ inapp: string }>;
}): Promise<JSX.Element> {
  const { token } = await params;
  console.log("hung token:", token);
  return <RegisterPageClient key={token} />;
  //   return null;
}
