import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Adaptive Brain",
  description: "Your AI-powered study companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FCF9F1] font-body antialiased">
        {children}
      </body>
    </html>
  );
}
