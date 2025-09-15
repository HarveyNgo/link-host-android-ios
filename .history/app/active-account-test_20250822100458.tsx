
export default async function ActiveAccountPage({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<JSX.Element> {
  const { key } = await params;
  console.log("hung key:", key);
  return <RegisterPageClient token={key} />;
  //   return null;
}
