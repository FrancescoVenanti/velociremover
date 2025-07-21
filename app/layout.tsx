import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veloci Remover – Clean AI Text Instantly",
  description:
    "Remove zero-width and invisible Unicode characters from your text. Clean up AI artifacts, copy-pasted junk, and view detailed text statistics.",
  generator: "Circloid",
  keywords: [
    "text cleaner",
    "zero-width space remover",
    "unicode sanitizer",
    "remove invisible characters",
    "clean AI text",
    "text processor online",
    "markdown cleaner",
    "veloci remover",
  ],
  authors: [{ name: "Circloid Org", url: "https://buymeacoffee.com/circloid" }],
  creator: "Circloid Org",
  publisher: "Circloid Org",
  openGraph: {
    title: "Veloci Remover – Clean AI Text Instantly",
    description:
      "Paste or upload your text and instantly remove AI-generated invisible junk. Supports various formats and gives live statistics.",
    url: "https://velociremover.vercel.app/", // replace with your actual domain
    siteName: "Veloci Remover",
    locale: "en_US",
    type: "website",
  },
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
