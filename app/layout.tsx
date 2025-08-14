// app/layout.tsx
export const metadata = {
  title: "B3Well Link Host",
  description:
    "Opens the app if installed, otherwise sends users to the store.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "ui-sans-serif, system-ui" }}>{children}</body>
    </html>
  );
}
