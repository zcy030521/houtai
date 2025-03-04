import Link from "next/link";
export default function RootLayout({
  children,
  books,
}: Readonly<{
  children: React.ReactNode;
  books: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div style={{display:"flex"}}>
        {books}
        {children}
        </div>
      </body>
    </html>
  );
}
