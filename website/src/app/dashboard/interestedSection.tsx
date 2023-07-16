"use client";

import { useAppSelector } from "@/redux/hooks";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

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
type Client = {
  clientId: string;
  firstName: String;
  lastName: String;
  contact_no: String;
  email: String;
  password: String;
};
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
async function requestVisitorInfo(clientId: string): Promise<Client | null> {
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

export default function InterestedSection() {
  const agentId = useAppSelector((state) => state.personalInfo.agentId);
  const [interested, setInterested] = useState(Array<Client>);
  useEffect(() => {
    if (!agentId) {
      alert("UnAuthorized Access!");
      return;
    }
    requestProperties(agentId).then((properties) => {
      console.log("properties:", properties);
      if (!properties) return;
      Promise.all(
        properties
          .map((property) => property.interested)
          .reduce((state, idGroup) => [...state, ...idGroup])
          .map(async (clientId) => {
            const interestedVisitor = await requestVisitorInfo(clientId);
            if (!interestedVisitor) {
              console.log(
                "Client ID: ",
                clientId,
                "ClientInfo: ",
                interestedVisitor
              );
              throw new Error("VISITOR NOT FOUND");
            }
            return interestedVisitor;
          })
      )
        .then((interestedVisitors) => setInterested(interestedVisitors))
        .catch((err: Error) => console.log(err.message));
    });
  }, []);

  return (
    <section className="grid gap-5">
      <div className="flex flex-wrap gap-2 justify-center">
        <div className="flex items-center gap-2">
          <p>Sort:</p>
          <select className="bg-white px-2 py-1 border-2 border-purple-500 rounded-full cursor-pointer hover:bg-purple-500 hover:text-white">
            <option>Asc</option>
            <option>Desc</option>
          </select>
          <p>Filter:</p>
          <select className="bg-white px-2 py-1 border-2 border-purple-500 rounded-full cursor-pointer hover:bg-purple-500 hover:text-white">
            <option>1</option>
            <option>12</option>
          </select>
        </div>
        <input className="px-4 py-1 border-2 border-gray-300 rounded-full lg:w-1/2" />
      </div>
      <div className="relative overflow-x-auto w-full max-h-[80vh] rounded-lg border-2 border-gray-300 shadow-md">
        <table className="w-full border-spacing-10 bg-white">
          <caption className="px-6 py-2 text-start text-white bg-green-700">
            Visitors
          </caption>
          <thead className="px-3 py-1 sticky top-0 bg-green-500">
            <tr className="px-3 py-1">
              <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
                Index
              </th>
              <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
                First Name
              </th>
              <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
                Last Name
              </th>
              <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
                Contact No
              </th>
              <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="px-3 py-1">
            {interested.map((client, inx) => (
              <tr
                key={client.clientId}
                className={[
                  "px-3 py-1",
                  inx % 2 == 1 ? "bg-green-200" : "bg-green-50",
                ].join(" ")}
              >
                <td className="px-3 py-2 text-sm text-center">{inx + 1}</td>
                <td className="px-3 py-2 text-sm text-center">
                  {client.firstName}
                </td>
                <td className="px-3 py-2 text-sm text-center">
                  {client.lastName}
                </td>
                <td className="px-3 py-2 text-sm text-center">
                  {client.contact_no}
                </td>
                <td className="px-3 py-2 text-sm text-center">
                  {client.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
