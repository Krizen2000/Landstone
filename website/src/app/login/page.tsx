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
  name: string;
  token: string;
  clientId: string;
};

async function requestClientLogin(
  email: string,
  password: string
): Promise<ClientInfo | null> {
  const dataPacket = {
    email,
    password,
  };
  let res: AxiosResponse;
  try {
    res = await axios.post("/api/clients/login", dataPacket);
  } catch (err) {
    console.error(err);
    return null;
  }
  if (!res.data.token || !res.data.clientId) {
    console.error(res);
    return null;
  }
  const { token, clientId, firstName, lastName } = res.data;
  const name = [firstName, lastName].join(" ");
  return { token, clientId, name };
}

export default function Login() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetAction = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
  };
  const submitAction = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!password || !email) return;
    const value = await requestClientLogin(email, password);
    if (!value) return;
    const { token, clientId, name } = value;

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
        <h1 className="text-center text-4xl font-extrabold">Welcome!</h1>
        <p className="text-center text-sm">
          We are glad that we can be in your service again!
        </p>
        <div className="m-1 px-4 py-8 max-w-md grid gap-1 border-2 border-gray-300 bg-white rounded md:px-8 md:py-12">
          <h1 className="mb-4 text-center text-3xl font-semibold text-black">
            Login
          </h1>
          <form className="grid gap-1">
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
          </form>
          <Link className="text-sm text-center text-blue-600" href="/signup">
            Don't have an account? SignUp
          </Link>
          <Link
            className="text-sm text-center text-blue-600"
            href="/loginAgent"
          >
            Are you an Agent? Login as Agent
          </Link>
          <div className="mt-3 flex justify-center gap-2">
            <button
              className="font-semibold cursor-pointer border-2 border-yellow-500 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-500 active:border-yellow-400 active:bg-yellow-400 hover:text-white"
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
              Login
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
