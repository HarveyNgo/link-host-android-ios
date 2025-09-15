"use client";

import { useState, useEffect } from "react";

interface PageProps {
  params: Promise<{ key: string }>;
}

export default async function OpenDeepLinkPage({ params }: PageProps) {
  const { key } = await params;

  // You can't use hooks in async components, so move logic to a client component:
  return <OpenDeepLinkClient keyValue={key} />;
}

function OpenDeepLinkClient({ keyValue }: { keyValue: string }) {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  console.log("hung isAndroid:", isAndroid);
  console.log("hung isIOS:", isIOS);

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.replace("b3well-patient-development://login?status=done");
    }, 5200);
    return () => clearTimeout(timeout);
  }, [keyValue]);

  return (
    <>
      <h1>open deep link test</h1>
    </>
  );
}
