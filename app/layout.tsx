import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VELOCIREMOVER",
  description: "remove AI junk from texts",
  generator: "Circloid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
