import { JSX } from "react";

export default async function ActiveAccountPage({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<JSX.Element> {
  const { key } = await params;
  console.log("hung key:", key);
  return <>
  <h1>this is active account
    </h1></>
  //   return null;
}
