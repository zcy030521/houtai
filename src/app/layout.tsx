// "use client"
import '@ant-design/v5-patch-for-react-19';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();

  // useEffect(() => {
  //   // if (router.pathname === "/") {
  //     // router.replace("/home");
  //   // }
  // }, []);
  return (
    <html lang="en">
      <body style={{ width: "100vw", height: "100vh" }}>{children}</body>
    </html>
  );
}
