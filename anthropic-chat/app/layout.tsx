import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claude AI",
  description: "Claude AI assistant powered by Anthropic models via Ollama",
  icons: {
    icon: "/anthropic.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}