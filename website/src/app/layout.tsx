import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata } from "next";
import { ReduxProvider } from "../../redux/reduxProvider";
import NavigationBar from "./navigationBar";

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
      <body className="bg-gray-200">
        <ReduxProvider>
          <NavigationBar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
