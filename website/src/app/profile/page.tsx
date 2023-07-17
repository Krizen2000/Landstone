"use client";

import { useAppSelector } from "@/redux/hooks";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import SavedPropertiesSection from "./savedPropertiesSection";
import InterestedProperties from "./interestedProperties";

type PropertyType = {
  _id: string;
  agentId: string;
  type: string;
  name: string;
  price: {
    from: number;
    to: number;
  };
  description: string;
  location: string;
  visibility: boolean;
  interested: string[];
  views: string[];
};
type ClientType = {
  _id: string;
  firstName: string;
  lastName: string;
  contact_no: string;
  email: string;
  saved_properties: string[] | null;
};

async function requestClientInfo(clientId: string) {
  let res: AxiosResponse;
  try {
    res = await axios.get(`/api/properties?clientId=${clientId}`);
  } catch (err) {
    console.log(err);
    return null;
  }
  if (!res.data.properties) return null;
  const interestedProperties: PropertyType[] = res.data.properties;
  try {
    res = await axios.get(`/api/clients/search?clientId=${clientId}`);
  } catch (err) {
    console.log(err);
    return null;
  }
  const clientInfo: ClientType = res.data;
  return { clientInfo, interestedProperties };
}
async function requestProperty(
  propertyId: string
): Promise<PropertyType | null> {
  let res: AxiosResponse;
  try {
    res = await axios.get(`/api/properties/search?propertyId=${propertyId}`);
  } catch (err) {
    console.log(err);
    return null;
  }
  if (!res.data) return null;
  return res.data;
}

export default function Profile() {
  const { clientId } = useAppSelector(
    ({ token, personalInfo: { clientId } }) => ({ token, clientId })
  );
  const [selectedSection, setSelectedSection] = useState("saved");
  const [savedProperties, setSavedProperties] = useState(Array<PropertyType>());
  const [interestedProperties, setInterestedProperties] = useState(
    Array<PropertyType>()
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!clientId) return;
    requestClientInfo(clientId).then((props) => {
      if (!props) return;
      const { clientInfo, interestedProperties } = props;
      setFirstName(clientInfo.firstName);
      setLastName(clientInfo.lastName);
      setContactNo(clientInfo.contact_no);
      setEmail(clientInfo.email);
      setInterestedProperties(interestedProperties);
      if (!clientInfo.saved_properties) return;
      const { saved_properties } = clientInfo;
      Promise.all(
        saved_properties.map(async (propertyId) => {
          const propertyInfo = await requestProperty(propertyId);
          if (!propertyInfo) throw new Error("PROPERTY INFO NOT FOUND");
          return propertyInfo;
        })
      ).then((savedPropertiesDetails) =>
        setSavedProperties(savedPropertiesDetails)
      );
    });
  }, []);

  return (
    <main className="px-4 py-10 flex flex-wrap justify-center gap-5 lg:px-24">
      <section className="grid gap-3">
        <h2 className="text-3xl text-center font-semibold">
          Personal Information
        </h2>
        <form className=" grid gap-1 bg-white px-4 py-6 rounded-lg shadow-lg">
          <label>First Name:</label>
          <input
            disabled
            className="bg-gray-300 border-2 border-gray-300 rounded-md px-2 py-1"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label>Last Name:</label>
          <input
            disabled
            className="bg-gray-300 border-2 border-gray-300 rounded-md px-2 py-1"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label>Contact No:</label>
          <input
            disabled
            className="bg-gray-300 border-2 border-gray-300 rounded-md px-2 py-1"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
          <label>Email:</label>
          <input
            disabled
            className="bg-gray-300 border-2 border-gray-300 rounded-md px-2 py-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="mt-3 flex justify-center gap-2">
            <button className="font-semibold cursor-pointer border-2 border-yellow-500 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-500 active:bg-yellow-400 active:border-yellow-400 hover:text-white">
              Delete
            </button>
            <button className="font-semibold cursor-pointer text-white bg-green-500 px-4 py-2 rounded hover:bg-green-400 active:bg-green-500">
              Log Out
            </button>
          </div>
        </form>
      </section>
      {clientId ? (
        <>
          <section className="grow flex flex-wrap gap-2 justify-center md:gap-5">
            <button
              className={[
                "grid content-center w-32 px-5 py-6 aspect-square border-2 border-gray-300 bg-white rounded-lg",
                "hover:!border-blue-500 active:!bg-blue-500 active:!text-white",
                "md:w-1/6 md:grow",
                `${
                  selectedSection === "saved"
                    ? "!bg-blue-500 !text-white hover:!bg-blue-400 hover:!border-blue-400 active:!bg-blue-500"
                    : ""
                }`,
              ].join(" ")}
              onClick={() => setSelectedSection("saved")}
            >
              <p className="text-center text-4xl md:text-6xl">
                {savedProperties.length}
              </p>
              <h3 className="text-center text-sm md:text-base">
                Saved Properties
              </h3>
            </button>
            <button
              className={[
                "grid content-center w-32 px-5 py-6 aspect-square border-2 border-gray-300 bg-white rounded-lg",
                "hover:border-green-500 active:bg-green-500 active:text-white",
                "md:w-1/6 md:grow",
                `${
                  selectedSection === "interested"
                    ? "!bg-green-500 !text-white hover:!bg-green-400 hover:!border-green-400 active:!bg-green-500"
                    : ""
                }`,
              ].join(" ")}
              onClick={() => setSelectedSection("interested")}
            >
              <p className="text-center text-4xl md:text-6xl">
                {interestedProperties.length}
              </p>
              <h3 className="text-center text-sm md:text-base">
                Interested Properties
              </h3>
            </button>
            <Link
              href="/properties"
              className={[
                "grid content-center w-32 px-5 py-6 aspect-square border-2 border-gray-300 bg-white rounded-lg",
                "md:w-1/6 md:grow",
                `${
                  selectedSection === "interested"
                    ? "!bg-green-500 !text-white hover:!bg-green-400 hover:!border-grenn-400 active:!bg-green-500"
                    : "!bg-blue-500 !text-white hover:!bg-blue-400 hover:!border-blue-400 active:!bg-blue-500"
                }`,
              ].join(" ")}
            >
              <i className="bi-plus text-center text-7xl md:text-8xl lg:text-9xl" />
              <h3 className="text-center text-sm md:text-base">Add more</h3>
            </Link>
          </section>{" "}
        </>
      ) : null}
      {selectedSection === "saved" && clientId !== null ? (
        <SavedPropertiesSection savedProperties={savedProperties} />
      ) : (
        <InterestedProperties interestedProperties={interestedProperties} />
      )}
    </main>
  );
}
