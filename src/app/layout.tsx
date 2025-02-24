import { interSans } from "@/theme/fonts";
import "@/theme/tokens.css";
import "@/theme/reset.css";
import "@/theme/base.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={interSans.variable}>{children}</body>
    </html>
  );
}

export { metadata } from "./metadata";
