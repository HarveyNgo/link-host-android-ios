"use client";
import React from "react";
import { JSX } from "react";
import { useSearchParams } from "next/navigation";

function RegisterPageClient({ inapp }: { inapp: boolean }) {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  console.log("hung isAndroid:", isAndroid);
  console.log("hung isIOS:", isIOS);
  console.log("hung inapp", inapp);

  React.useEffect(() => {
    if (isAndroid && !inapp) {
      window.location.href = `b3well-patient-development://login?url=https://link-host.vercel.app/test-open-app`;
    } else if (isIOS && !inapp) {
      window.location.href = `b3well-patient-development://login?url=https://link-host.vercel.app/test-open-app`;
    } else {
    }
  }, [inapp, isAndroid, isIOS]);

  return (
    <main style={{ padding: 24, maxWidth: 640, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Open B3Well App</h1>
      <h2>In app: {inapp ? "Yes" : "No"}</h2>
    </main>
  );
}

export default async function ActiveAccountPage(): Promise<JSX.Element> {
  const searchParams = useSearchParams();
  const e = searchParams.get("e");

  return <RegisterPageClient inapp={inapp} />;
  //   return null;
}
