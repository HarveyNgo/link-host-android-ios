"use client";
import { JSX } from "react";

import { useState, useEffect } from "react";

export default function ActiveAccountPage({
  params,
}: {
  params: { key: string };
}) {
  const [key, setKey] = useState<string | null>(null);

  useEffect(() => {
    if (params && params.key) {
      setKey(params.key);
      console.log("hung key:", params.key);
    }
    setTimeout(() => {
      window.location.replace("b3well-patient-development://login?status=done");
    }, 5200);
  }, [params]);

  function onClick() {
    window.location.href = "b3well-patient-development://login?status=done";
  }

  return (
    <>
      <h1>this is active account</h1>
      <button onClick={onClick}>activate account</button>
    </>
  );
}
