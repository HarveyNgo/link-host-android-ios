"use client";
import React, { Suspense } from "react";
import { JSX } from "react";
import { useSearchParams } from "next/navigation";

function RegisterPageClient({ inapp }: { inapp: boolean }) {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  console.log("hung isAndroid:", isAndroid);
  console.log("hung isIOS:", isIOS);
  console.log("hung inapp", inapp);

  const isAldreadyInapp=inapp
  React.useEffect(() => {
    if (isAndroid && !inapp) {
      window.location.href = `b3well-patient-development://login?url=https://link-host.vercel.app/test-open-app`;
    } else if (isIOS && !inapp) {
      window.location.href = `b3well-patient-development://login?url=https://link-host.vercel.app/test-open-app`;
    } else {
        //wweb
    }
  }, [inapp, isAndroid, isIOS]);

  return (
    <main style={{ padding: 24, maxWidth: 640, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Open B3Well App</h1>
      <h2>In app: {inapp ? "Yes" : "No"}</h2>
    </main>
  );
}

function ActiveAccountPageInner(): JSX.Element {
  const searchParams = useSearchParams();
  const inapp = searchParams.get("inapp") === "true";

  return <RegisterPageClient inapp={inapp} />;
}

export default function ActiveAccountPage(): JSX.Element {
  return (
    <Suspense fallback={null}>
      <ActiveAccountPageInner />
    </Suspense>
  );
}
