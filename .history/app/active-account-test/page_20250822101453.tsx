'use client'
import { JSX } from "react";

import { useEffect, useState } from "react";

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
  }, [params]);

  function onClick() {
    window.location.href = `patientportal-keycloak://callback`;
  }

  return (
    <>
      <h1>this is active account</h1>
      <button onClick={onClick}>finish</button>
    </>
  );
  //   return null;
  //callback: patientportal-keycloak://callback
}
