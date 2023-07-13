"use client";

import Link from "next/link";
import NewsLetterForm from "./newLetterForm";
import { useAppSelector } from "@/redux/hooks";

const Footer: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.personalInfo.type);
  return (
    <footer className="py-8 flex flex-wrap items-start justify-between bg-green-500 md:px-24">
      <Link
        href="/"
        className="mt-8 mb-8 ml-2 cursor-pointer no-underline text-gray-300 hover:text-white font-medium text-4xl"
      >
        LANDSTONE
      </Link>
      <div className="flex flex-wrap gap-10 justify-center md:gap-20">
        <div className="grid gap-4 content-start">
          <Link href="/" className="m0 text-gray-300 hover:text-white md:-ml-4">
            Landstone
          </Link>
          <nav className="ml-4 no-underline text-gray-300 hover:text-white grid gap-2 md:m-0">
            <Link
              href="/"
              className="no-underline text-gray-300 hover:text-white"
            >
              Home
            </Link>
            {!isLoggedIn ? (
              <>
                <Link
                  href="/signup"
                  className="no-underline text-gray-300 hover:text-white"
                >
                  Signup
                </Link>
                <Link
                  href="/login"
                  className="no-underline text-gray-300 hover:text-white"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="no-underline text-gray-300 hover:text-white"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="no-underline text-gray-300 hover:text-white"
                >
                  Profile
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className="grid gap-4 content-start">
          <Link href="/" className="m0 text-gray-300 hover:text-white md:-ml-4">
            Contact
          </Link>
          <address className="ml-4 not-italic no-underline text-gray-300 hover:text-white grid gap-2 md:m-0">
            <Link
              href="http://www.gmail.com"
              className="no-underline text-gray-300 hover:text-white"
            >
              Email
            </Link>
            <Link
              href="http://www.linkedin.com"
              className="no-underline text-gray-300 hover:text-white"
            >
              LinkedIn
            </Link>
            <Link
              href="http://www.instagram.com"
              className="no-underline text-gray-300 hover:text-white"
            >
              Instagram
            </Link>
            <Link
              href="http://www.facebook.com"
              className="no-underline text-gray-300 hover:text-white"
            >
              Facebook
            </Link>
          </address>
        </div>
        <div className="grid content-center gap-2">
          <p className="text-center text-white">Join our NewsLetter</p>
          <NewsLetterForm />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
