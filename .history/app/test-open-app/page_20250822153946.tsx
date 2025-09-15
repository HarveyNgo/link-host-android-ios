export default async function ActiveAccountPage({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<JSX.Element> {
  const { token } = await params;
  console.log("hung token:", token);
  return <RegisterPageClient key={token} />;
  //   return null;
}
