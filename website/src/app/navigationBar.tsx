"use client";

import { useAppSelector } from "@/redux/hooks";
import LogoIcon from "@images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NavigationBar: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.personalInfo.type);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-green-600 flex p-6 gap-6 flex-col lg:flex-row lg:justify-between lg:px-24">
      <div className="flex items-center justify-between">
        <Link
          onClick={() => setIsOpen(false)}
          href="/"
          className="cursor-pointer flex gap-3 h-18 items-center content-start"
        >
          <Image
            className="h-14 lg:h-16 w-full aspect-square"
            src={LogoIcon}
            alt="landstone-logo"
          />
          <p className="m-0 text-2xl text-white">Landstone</p>
        </Link>
        <button
          className="flex items-center cursor-pointer content-center h-10 aspect-square p-2 bg-transparent border text-gray-300 hover:text-white lg:hidden"
          onClick={() => setIsOpen((state) => !state)}
        >
          {!isOpen ? (
            <i className="bi-list text-2xl text-inherit" />
          ) : (
            <i className="bi-x text-2xl text-inherit" />
          )}
        </button>
      </div>
      <nav
        className={[
          "flex items-center content-center lg:flex",
          !isOpen ? "hidden" : "",
        ].join(" ")}
      >
        <ul className="m-0 list-none flex flex-col flex-grow items-center gap-6 lg:flex-row">
          <li className="text-gray-300">
            <Link
              className="hover:text-white"
              onClick={() => setIsOpen(false)}
              href="/"
            >
              Home
            </Link>
          </li>
          {!isLoggedIn ? (
            <>
              <li className="text-gray-300">
                <Link
                  className="hover:text-white"
                  onClick={() => setIsOpen(false)}
                  href="/signupAgent"
                >
                  Register Agent
                </Link>
              </li>
              <li className="text-gray-300">
                <Link
                  className="hover:text-white"
                  onClick={() => setIsOpen(false)}
                  href="/loginAgent"
                >
                  Login Agent
                </Link>
              </li>
              <li className="text-gray-300">
                <Link
                  className="hover:text-white"
                  onClick={() => setIsOpen(false)}
                  href="/signup"
                >
                  Signup
                </Link>
              </li>
              <li className="text-gray-300">
                <Link
                  className="hover:text-white"
                  onClick={() => setIsOpen(false)}
                  href="/login"
                >
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              {isLoggedIn === "agent" ? (
                <li className="text-gray-300">
                  <Link
                    className="hover:text-white"
                    onClick={() => setIsOpen(false)}
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
              ) : null}

              <li className="text-gray-300">
                <Link
                  className="hover:text-white"
                  onClick={() => setIsOpen(false)}
                  href="/profile"
                >
                  Profile
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
