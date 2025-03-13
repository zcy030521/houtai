// "use client"
import '@ant-design/v5-patch-for-react-19';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body style={{ width: "100vw", height: "100vh" }}>{children}</body>
    </html>
  );
}
