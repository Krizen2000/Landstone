"use client";

import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

type Property = {
  name: string;
  type: string;
  image: string;
  price: {
    from: number;
    to: number;
  };
  description: string;
  location: string;
};
async function requestPropertyCreation(data: Property, token: string) {
  let axiosInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });
  try {
    await axiosInstance.post(`/api/properties/`, data);
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}

export default function CreateProperty() {
  const [name, setName] = useState("");
  const [type, setType] = useState("property");
  const [image, setImage] = useState("");
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(0);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const token = useAppSelector((state) => state.token);
  const resetAction = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setName("");
    setType("");
    setImage("");
    setPriceFrom(0);
    setPriceTo(0);
    setDescription("");
    setLocation("");
  };
  const submitAction = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!token) return;
    const data = {
      name,
      type,
      image,
      description,
      location,
      price: {
        from: priceFrom,
        to: priceTo,
      },
    };
    requestPropertyCreation(data, token).then((result) => {
      if (!result) {
        alert("Property could not be created!");
        return;
      }
      alert("Property created!");
      router.push("/dashboard");
    });
  };

  return (
    <main className="my-14 px-4 grid justify-center gap-4 lg:px-24">
      <h1 className="text-3xl text-center">Create Property</h1>
      <form
        id="form"
        className="px-4 py-5 w-[90vw] max-w-lg grid gap-2 border-2 border-gray-300 bg-white rounded-md"
      >
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 bg-gray-100"
        />
        <label>Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-1 py-1 border border-gray-300 bg-gray-100"
        >
          <option value="property">Property</option>
          <option value="resort">Resort</option>
          <option value="home">Home</option>
          <option value="apartment">Apartment</option>
          <option value="warehouse">Warehouse</option>
          <option value="storehouse">Storehouse</option>
        </select>
        <label>Image</label>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border border-gray-300 bg-gray-100"
        />
        <h3 className="mt-3">Price</h3>
        <div className="grid px-2 pt-1 pb-4 border rounded border-gray-300">
          <label>from</label>
          <input
            value={priceFrom}
            type="number"
            onChange={(e) => setPriceFrom(Number(e.target.value))}
            className="border border-gray-300 bg-gray-100"
          />
          <label>to</label>
          <input
            value={priceTo}
            type="number"
            onChange={(e) => setPriceTo(e.target.valueAsNumber)}
            className="border border-gray-300 bg-gray-100"
          />
        </div>
        <label>Description</label>
        <TextareaAutosize
          autoFocus
          ref={textAreaRef}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 bg-gray-100"
        />
        <label>Location</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 bg-gray-100"
        />
        <div className="mt-2 flex gap-4 justify-center">
          <button
            type="reset"
            onClick={resetAction}
            className="px-6 py-3 border-2 text-yellow-500 border-yellow-500 rounded hover:bg-yellow-500 hover:text-white active:border-yellow-400 active:bg-yellow-400"
          >
            Erase
          </button>
          <button
            type="submit"
            onClick={submitAction}
            className="px-6 py-3 border-2 text-white border-green-500 bg-green-500 rounded hover:bg-green-400 hover:border-green-400 active:border-green-500 active:bg-green-500"
          >
            Create
          </button>
        </div>
      </form>
    </main>
  );
}
