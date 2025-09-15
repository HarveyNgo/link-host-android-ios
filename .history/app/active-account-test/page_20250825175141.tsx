"use client";
import { JSX, useEffect } from "react";

export default function ActiveAccountPage({
  params,
}: {
  params: { key: string };
}): JSX.Element {
  const { key } = params;
  console.log("hung key:", key);

  useEffect(() => {
    // window.location.href = "b3well-patient-development://login?status=done";
    //     setTimeout(() => {
    //       window.location.replace(
    //         `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}`
    //       );
    //     }, 1200);
  }, []);

  function onClick() {
    // window.location.href = `patientportal-keycloak://callback`;
    window.location.href = "b3well-patient-development://login?status=done";
  }

  return (
    <>
      <h1>this is active account</h1>
      <button onClick={onClick}>activate account</button>
    </>
  );
  //callback: patientportal-keycloak://callback
}
