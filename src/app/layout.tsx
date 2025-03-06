
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div style={{display:"flex"}}>
        {children}
        </div>
      </body>
    </html>
  );
}
