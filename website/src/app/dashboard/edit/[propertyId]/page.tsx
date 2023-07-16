"use client";

import { useAppSelector } from "@/redux/hooks";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
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
  visibility: boolean;
};
async function requestProperty(propertyId: string) {
  let res: AxiosResponse<Property>;
  try {
    res = await axios.get(`/api/properties/search?propertyId=${propertyId}`);
  } catch (err) {
    console.log(err);
    return null;
  }
  return res.data;
}
async function requestPropertyUpdate(
  propertyId: string,
  data: Property,
  token: string
) {
  let axiosInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });
  try {
    await axiosInstance.put(`/api/properties/${propertyId}`, data);
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}

type Props = { params: { propertyId: string } };
export default function EditProperty(props: Props) {
  const propertyId = props.params.propertyId;
  const [name, setName] = useState("");
  const [type, setType] = useState("property");
  const [image, setImage] = useState("");
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(0);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [visibility, setVisibility] = useState(true);

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
    setVisibility(true);
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
      visibility,
    };
    requestPropertyUpdate(propertyId, data, token).then((result) => {
      if (!result) {
        alert("Property could not be updated!");
        return;
      }
      alert("Property updated!");
      router.push("/dashboard");
    });
  };

  useEffect(() => {
    requestProperty(propertyId).then((property) => {
      if (!property) {
        alert("Coudn't retrieve property data from server!");
        return;
      }
      setName(property.name);
      setType(property.type);
      setImage(property.image);
      setPriceFrom(property.price.from);
      setPriceTo(property.price.to);
      setDescription(property.description);
      setLocation(property.location);
      setVisibility(property.visibility);
    });
  }, []);

  return (
    <main className="my-14 px-4 grid justify-center gap-4 lg:px-24">
      <h1 className="text-3xl text-center">Edit Property</h1>
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
            onChange={(e) => setPriceFrom(e.target.valueAsNumber)}
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
        <label>Visibility</label>
        <select
          value={visibility ? "true" : "false"}
          onChange={(e) =>
            setVisibility(e.target.value === "true" ? true : false)
          }
          className="px-1 py-1 border border-gray-300 bg-gray-100"
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
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
            Update
          </button>
        </div>
      </form>
    </main>
  );
}
