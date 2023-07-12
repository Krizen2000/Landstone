import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { ReduxProvider } from "../../redux/reduxProvider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Landstone",
  description:
    "A basic website to trade real estate between the agent and the client.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body className={inter.className}>{children}</body> */}
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
