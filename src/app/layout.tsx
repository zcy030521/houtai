
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{backgroundColor:'black'}}>
        <div style={{display:"flex"}}>
        {children}
        </div>
      </body>
    </html>
  );
}
