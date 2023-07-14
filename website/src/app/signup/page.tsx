"use client";

import axios, { AxiosResponse } from "axios";
import { MouseEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setToken } from "@/redux/slices/tokenSlice";
import { setClientId, setName } from "@/redux/slices/personalInfoSlice";
import AppartImg from "@images/etienne-beauregard-riverin-B0aCvAVSX8E-unsplash.jpg";
import Image from "next/image";

type ClientInfo = {
  token: string;
  clientId: string;
};

async function requestClientSignup(
  firstName: string,
  lastName: string,
  contactNo: string,
  email: string,
  password: string
): Promise<ClientInfo | null> {
  const dataPacket = {
    firstName,
    lastName,
    contact_no: contactNo,
    email,
    password,
  };

  let res: AxiosResponse;
  try {
    res = await axios.post("/api/clients", dataPacket);
  } catch (err) {
    console.error(err);
    return null;
  }
  if (!res.data.token || !res.data.clientId) {
    console.error(res);
    return null;
  }
  const { token, clientId } = res.data;
  return { token, clientId };
}

export default function SignUp() {
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetAction = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFirstName("");
    setLastName("");
    setContactNo("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  const submitAction = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    const value = await requestClientSignup(
      firstName,
      lastName,
      contactNo,
      email,
      password
    );
    if (!value) return;
    const { token, clientId } = value;
    const name = [firstName, lastName].join(" ");

    if (!token) return;
    dispatch(setToken(token));
    dispatch(setName(name));
    dispatch(setClientId(clientId));
    router.push("/");
  };

  const router = useRouter();
  return (
    <main className="flex flex-wrap justify-center gap-10 py-6 px-4 lg:px-24">
      <Image
        className="w-full object-cover rounded-md md:w-1/2"
        src={AppartImg}
        alt="home_image"
      />
      <div className="grid gap-5">
        <h1 className="text-center text-4xl font-extrabold">Great!</h1>
        <p className="text-center text-sm">
          We just need you to fill the below form to fill the complete your
          signup.
        </p>
        <div className="m-1 px-4 py-8 max-w-md grid gap-1 border-2 border-gray-300 bg-white rounded md:px-8 md:py-12">
          <h1 className="mb-4 text-center text-3xl font-semibold text-black">
            Sign Up
          </h1>
          <form className="grid gap-1">
            <label className="text-sm">First Name</label>
            <input
              className="bg-gray-200 border-2 border-gray-300 rounded-md"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="text-sm">Last Name</label>
            <input
              className="bg-gray-200 border-2 border-gray-300 rounded-md"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="text-sm">Contact No</label>
            <input
              className="bg-gray-200 border-2 border-gray-300 rounded-md"
              type="text"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
            <label className="text-sm">Email</label>
            <input
              className="bg-gray-200 border-2 border-gray-300 rounded-md"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-sm">Password</label>
            <input
              className="bg-gray-200 border-2 border-gray-300 rounded-md"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="text-sm">Confirm Password</label>
            <input
              className="bg-gray-200 border-2 border-gray-300 rounded-md"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {password !== confirmPassword ? (
              <p className="text-sm text-red-600 text-center">
                Password is not matching with Confirm Password
              </p>
            ) : null}
          </form>
          <Link className="text-sm text-center text-blue-600" href="/login">
            Already a client? Login
          </Link>
          <Link
            className="text-sm text-center text-blue-600"
            href="/signupAgent"
          >
            Are you an Agent? Register as Agent
          </Link>
          <div className="mt-3 flex justify-center gap-2">
            <button
              className="font-semibold cursor-pointer border-2 border-yellow-500 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-500 active:bg-yellow-400 active:border-yellow-400 hover:text-white"
              type="reset"
              onClick={resetAction}
            >
              Clear
            </button>
            <button
              className="font-semibold cursor-pointer text-white bg-green-500 px-4 py-2 rounded hover:bg-green-400 active:bg-green-500"
              type="submit"
              onClick={submitAction}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
