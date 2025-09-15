"use client";
import { JSX } from "react";

export default async function ActiveAccountPage({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<JSX.Element> {
  const { key } = await params;
  console.log("hung key:", key);

  function onClick() {
    // window.location.href = `patientportal-keycloak://callback`;
    window.location.href =
      "patientportal-activate-account://callback?status=done";
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
