"use client";

import { useAppSelector } from "@/redux/hooks";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

type Property = {
  name: string;
  type:
    | "property"
    | "resort"
    | "home"
    | "apartment"
    | "warehouse"
    | "storehouse";
  image: string;
  price: {
    from: number;
    to: number;
  };
  description: string;
  location: string;
  views: string[];
  interested: string[];
};
type ClientType = {
  _id: string;
  firstName: string;
  lastName: string;
  contact_no: string;
  email: string;
  password: string;
  saved_properties: string[];
};
async function requestProperty(
  propertyId: string,
  token: string | null
): Promise<Property | null> {
  if (!token) return null;
  const axiosInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });
  let res: AxiosResponse;
  try {
    res = await axiosInstance.get(
      `/api/properties/search?propertyId=${propertyId}`
    );
  } catch (err) {
    console.log(err);
    return null;
  }
  if (!res.data) return null;
  return res.data;
}
async function requestClient(
  clientId: string | null
): Promise<ClientType | null> {
  if (!clientId) return null;
  let res: AxiosResponse;
  try {
    res = await axios.get(`/api/clients/search?clientId=${clientId}`);
  } catch (err) {
    console.log(err);
    return null;
  }
  if (!res.data) return null;
  return res.data;
}
async function requestTagProperty(
  propertyId: string,
  token: string | null
): Promise<boolean> {
  if (!token) return false;
  const axiosInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });
  try {
    await axiosInstance.put(`/api/properties/${propertyId}/tag`);
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}
async function requestUntagProperty(
  propertyId: string,
  token: string | null
): Promise<boolean> {
  if (!token) return false;
  const axiosInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });
  try {
    await axiosInstance.put(`/api/properties/${propertyId}/untag`);
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}
async function requestSaveProperty(
  propertyId: string,
  token: string | null
): Promise<boolean> {
  if (!token) return false;
  const axiosInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });
  try {
    await axiosInstance.put(`/api/clients/saveProperty`, { propertyId });
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}
async function requestUnsaveProperty(
  propertyId: string,
  token: string | null
): Promise<boolean> {
  const axiosInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });
  try {
    await axiosInstance.put(`/api/clients/unsaveProperty`, {
      propertyId,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}

const initialState = {
  name: "",
  type: "",
  image: "",
  price: { from: 0, to: 0 },
  description: "",
  location: "",
  views: Array<string>(),
  interested: Array<string>(),
};
type Props = { params: { propertyId: string } };
export default function PropertyDetailing(props: Props) {
  const token = useAppSelector((state) => state.token);
  const clientId = useAppSelector((state) => state.personalInfo.clientId);
  const propertyId = props.params.propertyId;
  const [property, setProperty] = useState(initialState);
  const [savedProperty, setSavedProperty] = useState(false);
  const [taggedProperty, setTaggedProperty] = useState(false);

  const tagUntagAction = (tagged) => {
    if (tagged) requestUntagProperty(propertyId, token);
    else requestTagProperty(propertyId, token);
    setTaggedProperty((state) => !state);
  };
  const saveUnsaveAction = (saved) => {
    if (saved) requestUnsaveProperty(propertyId, token);
    else requestSaveProperty(propertyId, token);
    setSavedProperty((state) => !state);
  };

  useEffect(() => {
    requestProperty(propertyId, token).then(async (property) => {
      if (!property) return;
      const clientInfo = await requestClient(clientId);
      const {
        name,
        type,
        image,
        price,
        description,
        location,
        views,
        interested,
      } = property;
      const clientInterested = interested.reduce(
        (state, interestedClient) => interestedClient === clientId || state,
        false
      );
      const clientSaved = clientInfo
        ? clientInfo.saved_properties.reduce(
            (state, savedClient) => savedClient === propertyId || state,
            false
          )
        : true;
      setTaggedProperty(clientInterested);
      setSavedProperty(clientSaved);
      setProperty({
        name,
        type,
        image,
        price,
        description,
        location,
        views,
        interested,
      });
    });
  }, []);

  return (
    <main className="flex flex-wrap gap-5 justify-center px-4 py-7 lg:px-24">
      <Image
        className="w-full aspect-square max-w-lg object-cover rounded-lg shadow-lg"
        src={property.image}
        alt={property.name}
        width={0}
        height={0}
        sizes="100vh"
      />
      <section className="grid gap-5 max-w-lg">
        <div className="ml-5">
          <h3>Property Name</h3>
          <p className="text-5xl">{property.name}</p>
          <div className="flex items-center gap-1 mt-3">
            <p>{property.views.length}</p>
            <i className="bi-person-fill text-xl" />
            <p className="mr-2">views</p>
            <p>{property.interested.length}</p>
            <i className="bi-person-fill text-xl" />
            <p>interested</p>
          </div>
        </div>
        <div className="bg-white rounded-lg px-4 py-4 shadow-lg">
          <h3>Description</h3>
          <p>{property.description}</p>
        </div>
        <div className="mt-2 flex gap-4 justify-center">
          {clientId ? (
            <>
              <button
                onClick={() => saveUnsaveAction(savedProperty)}
                className="px-6 py-3 border-2 bg-white text-yellow-500 border-yellow-500 rounded hover:bg-yellow-500 hover:text-white active:border-yellow-400 active:bg-yellow-400"
              >
                {savedProperty ? "Unsave" : "Save"}
              </button>
              <button
                onClick={() => tagUntagAction(taggedProperty)}
                className="px-6 py-3 border-2 text-white border-green-500 bg-green-500 rounded hover:bg-green-400 hover:border-green-400 active:border-green-500 active:bg-green-500"
              >
                {taggedProperty ? "Uninterest" : "Show Interest"}
              </button>
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}
