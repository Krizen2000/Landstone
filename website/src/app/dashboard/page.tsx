"use client";

import { useEffect, useState } from "react";
import VisitorsSection from "./visitorsSection";
import PropertiesSection from "./propertiesSection";
import InterestedSection from "./interestedSection";
import axios, { AxiosResponse } from "axios";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

type Properties = [
  {
    name: string;
    type: [
      "property",
      "resort",
      "home",
      "apartment",
      "warehouse",
      "storehouse",
    ];
    image: string;
    price: {
      from: number;
      to: number;
    };
    description: string;
    location: string;
    visibility: boolean;
    views: string[];
    interested: string[];
  },
];
async function requestProperties(agentId: string): Promise<Properties | null> {
  let res: AxiosResponse;
  try {
    res = await axios.get(`/api/properties/search?agentId=${agentId}`);
  } catch (err) {
    console.log(err);
    return null;
  }
  if (!res.data.properties) return null;
  return res.data.properties;
}


export default function Dashboard() {
  const agentId = useAppSelector((state) => state.personalInfo.agentId);
  const [selectedSection, setSelectedSection] = useState("visitors");
  const [visitors, setVisitors] = useState(0);
  const [properties, setProperties] = useState(0);
  const [interested, setIntereseted] = useState(0);

  useEffect(() => {
    if (!agentId) {
      alert("UnAuthorized Access!");
      return;
    }
    requestProperties(agentId).then((properties) => {
      if (!properties) return;
      const propertiesLength = properties.length;
      const visitorsLength = properties.reduce(
        (length, property) => length + property.views.length,
        0
      );
      const interestedLength = properties.reduce(
        (length, property) => length + property.interested.length,
        0
      );
      setProperties(propertiesLength);
      setVisitors(visitorsLength);
      setIntereseted(interestedLength);
    });
  }, []);

  return (
    <main className="my-14 px-4 grid gap-10 lg:px-24">
      <section className="flex flex-wrap gap-2 justify-center md:gap-5 lg:gap-10">
        <button
          className={[
            "grid content-center w-32 px-5 py-6 aspect-square border-2 border-gray-300 bg-white rounded-lg",
            "hover:border-yellow-500 active:bg-yellow-500 active:text-white",
            "md:w-1/6",
            `${
              selectedSection === "visitors"
                ? "!bg-yellow-500 !text-white hover:!bg-yellow-400 hover:!border-yellow-400 active:!bg-yellow-500"
                : ""
            }`,
          ].join(" ")}
          onClick={() => setSelectedSection("visitors")}
        >
          <p className="text-center text-4xl md:text-6xl">{visitors}</p>
          <h3 className="text-center text-sm md:text-base">Total Visitors</h3>
        </button>
        <button
          className={[
            "grid content-center w-32 px-5 py-6 aspect-square border-2 border-gray-300 bg-white rounded-lg",
            "hover:!border-blue-500 active:!bg-blue-500 active:!text-white",
            "md:w-1/6",
            `${
              selectedSection === "properties"
                ? "!bg-blue-500 !text-white hover:!bg-blue-400 hover:!border-blue-400 active:!bg-blue-500"
                : ""
            }`,
          ].join(" ")}
          onClick={() => setSelectedSection("properties")}
        >
          <p className="text-center text-4xl md:text-6xl">{properties}</p>
          <h3 className="text-center text-sm md:text-base">Total Properties</h3>
        </button>
        <button
          className={[
            "grid content-center w-32 px-5 py-6 aspect-square border-2 border-gray-300 bg-white rounded-lg",
            "hover:border-green-500 active:bg-green-500 active:text-white",
            "md:w-1/6",
            `${
              selectedSection === "interested"
                ? "!bg-green-500 !text-white hover:!bg-green-400 hover:!border-green-400 active:!bg-green-500"
                : ""
            }`,
          ].join(" ")}
          onClick={() => setSelectedSection("interested")}
        >
          <p className="text-center text-4xl md:text-6xl">{interested}</p>
          <h3 className="text-center text-sm md:text-base">Total Interested</h3>
        </button>
        <Link
          href="/dashboard/create"
          className={[
            "grid content-center w-32 px-5 py-6 aspect-square border-2 border-gray-300 bg-white rounded-lg",
            "md:w-1/6",
            `${
              selectedSection === "interested"
                ? "!bg-green-500 !text-white hover:!bg-green-400 hover:!border-grenn-400 active:!bg-green-500"
                : selectedSection === "properties"
                ? "!bg-blue-500 !text-white hover:!bg-blue-400 hover:!border-blue-400 active:!bg-blue-500"
                : "!bg-yellow-500 !text-white hover:!bg-yellow-400 hover:!border-yellow-400 active:!bg-yellow-500"
            }`,
          ].join(" ")}
        >
          <i className="bi-plus text-center text-7xl md:text-8xl lg:text-9xl" />
          <h3 className="text-center text-sm md:text-base">Property</h3>
        </Link>
      </section>
      {selectedSection === "visitors" ? (
        <VisitorsSection />
      ) : selectedSection === "properties" ? (
        <PropertiesSection />
      ) : (
        <InterestedSection />
      )}
    </main>
  );
}
