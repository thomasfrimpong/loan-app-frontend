import { Inter } from "next/font/google";
import React from "react";
import AuthContext from "./context/AuthContext";
import Provider from "./context/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Loan Application",
  description: "Dashboard to monitor loans",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <Provider>{children}</Provider>
        </AuthContext>
      </body>
    </html>
  );
}
