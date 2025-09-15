"use client";
import { JSX, useEffect } from "react";

export default async function ActiveAccountPage({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<JSX.Element> {
  const { key } = await params;
  console.log("hung key:", key);

  useEffect((0=>{0,[]}))
  function onClick() {
    // window.location.href = `patientportal-keycloak://callback`;
    //
    window.location.href = "b3well-patient-development://login?status=done";
  }
  return (
    <>
      <h1>this is active account</h1>
      <button onClick={onClick}>activate account</button>
    </>
  );
  //   return null;
  //callback: patientportal-keycloak://callback
}
