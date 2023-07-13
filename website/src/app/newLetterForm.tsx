"use client";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setIsSubscribed } from "../redux/slices/newsEmail";

const uploadCredentials = async (email: string) => {
  const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_SERVER_URL,
  });
  const data = { email };
  axiosInstance.post("/api/newsEmail", data);
};

const NewsLetterForm: React.FC = () => {
  const [newsEmail, setNewsEmail] = useState("");
  let isSubscribed = useAppSelector((state) => state.newsEmail.isSubscribed);
  const dispatch = useAppDispatch();

  const submitAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newsEmail) return;
    uploadCredentials(newsEmail)
      .then(() => dispatch(setIsSubscribed()))
      .catch((err) => {
        if (err.response?.data.error === "EMAIL_SUBSCRIBED") return;
        throw err;
      });
  };

  return (
    <>
      {isSubscribed ? (
        <>
          <i className="bi-check-circle-fill inline-flex justify-self-center text-5xl text-white" />
        </>
      ) : (
        <form className="flex gap-2" onSubmit={submitAction}>
          <input
            type="email"
            onChange={(e) => setNewsEmail(e.target.value)}
            className="w-48 px-4 bg-gray-300 border-gray-300 rounded-2xl lg:w-60"
          />
          <button
            type="submit"
            className="text-white cursor-pointer text-sm py-2 px-3 bg-yellow-500 border-yellow-500  rounded-2xl"
          >
            Subscribe
          </button>
        </form>
      )}
    </>
  );
};

export default NewsLetterForm;
