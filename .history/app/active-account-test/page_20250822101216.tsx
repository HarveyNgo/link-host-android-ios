import { JSX } from "react";

export default async function ActiveAccountPage({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<JSX.Element> {
  const { key } = await params;
  console.log("hung key:", key);

  function onClick(){
    window.location.href = `http://returnURL=patientportal-keycloak://callback`;
  }
  return (
    <>
      <h1>this is active account</h1>
      <button>finish</button>
    </>
  );
  //   return null;
  //callback: patientportal-keycloak://callback
}
