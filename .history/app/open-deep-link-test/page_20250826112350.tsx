"use client";

import { useState, useEffect } from "react";

interface PageProps {
  params: Promise<{ key: string }>;
}

export default async function ActiveAccountPage({ params }: PageProps) {
  const { key } = await params;

  // You can't use hooks in async components, so move logic to a client component:
  return <OpenDeepLink keyValue={key} />;
}

function OpenDeepLink({ keyValue }: { keyValue: string }) {
  useEffect(() => {
    if (keyValue) {
      console.log("hung key:", keyValue);
    }
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
