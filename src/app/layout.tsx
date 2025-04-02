import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolify - Seu gerador de portfólio minimalista",
  description: "Crie portfólios profissionais em minutos com Portfolify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="light">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
