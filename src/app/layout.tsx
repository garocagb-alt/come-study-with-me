import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Come, Study with Me",
  description: "Tu compañero personal de estudio de las Escrituras",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-bg">
        <div className="max-w-md mx-auto min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
