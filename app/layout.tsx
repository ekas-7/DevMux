import { Metadata } from "next";
import "./globals.css";
import ClientProvider from "./providers";

export const metadata: Metadata = {
  title: "DevMux",
  description: "Collaborate, Code, and Create",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
