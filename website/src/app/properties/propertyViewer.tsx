"use client";

import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Property = {
  _id: string;
  agentId: string;
  type: string;
  name: string;
  image: string;
  price: {
    from: number;
    to: number;
  };
  description: string;
  location: string;
  interested: string[];
  views: string[];
};
async function requestProperties(): Promise<Property[] | null> {
  let res: AxiosResponse;
  try {
    res = await axios.get("/api/properties");
  } catch (err) {
    console.log(err);
    return null;
  }
  return res.data.properties;
}
const numFormatter = Intl.NumberFormat("en", { notation: "compact" });

export default function PropertyViewer() {
  const [sortOption, setSortOption] = useState("views");
  const [typeOption, setTypeOption] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [properties, setProperties] = useState(Array<Property>());
  const [searchProperties, setSearchProperties] = useState(Array<Property>());

  useEffect(() => {
    requestProperties().then((properties) => {
      if (!properties) return;
      const sortedProperties = properties.sort(
        (a, b) => b.views.length - a.views.length
      );
      setProperties(properties);
      setSearchProperties(sortedProperties);
    });
  }, []);
  useEffect(() => {
    let filteredProperties = properties;
    if (typeOption !== "all")
      filteredProperties = properties.filter(
        (property) => property.type === typeOption
      );
    if (searchText !== "") {
      filteredProperties = filteredProperties.filter(
        (property) =>
          property.name.toLowerCase().startsWith(searchText.toLowerCase()) ||
          property.location.toLowerCase().startsWith(searchText.toLowerCase())
      );
    }

    let sortedProperties = filteredProperties.sort(
      (a, b) => b.views.length - a.views.length
    );
    if (sortOption !== "views")
      sortedProperties = filteredProperties.sort(
        (a, b) => b.interested.length - a.interested.length
      );
    setSearchProperties(sortedProperties);
  }, [sortOption, typeOption, searchText]);

  return (
    <section className="grid gap-6">
      <div className="flex flex-wrap gap-2 justify-center">
        <div className="flex flex-wrap justify-center items-center gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-center">Sort:</p>
            <select
              onChange={(e) => setSortOption(e.target.value)}
              className="text-center bg-white px-1 py-1 border-2 border-yellow-500 rounded-full cursor-pointer hover:bg-yellow-500 hover:text-white"
            >
              <option value="views">Views</option>
              <option value="interests">Interests</option>
            </select>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <p className="text-center">Type:</p>
            <select
              onChange={(e) => setTypeOption(e.target.value)}
              className="text-center bg-white px-1 py-1 border-2 border-yellow-500 rounded-full cursor-pointer hover:bg-yellow-500 hover:text-white"
            >
              <option value="all">All</option>
              <option value="property">Property</option>
              <option value="resort">Resort</option>
              <option value="home">Home</option>
              <option value="apartment">Apartment</option>
              <option value="warehouse">Warehouse</option>
              <option value="storehouse">Storehouse</option>
            </select>
          </div>
        </div>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          className="px-4 py-1 border-2 border-gray-300 rounded-full lg:w-1/2"
        />
      </div>
      <div className="flex flex-wrap gap-5 justify-center px-4 lg:px-24">
        {searchProperties.map((property) => (
          <Link
            key={property._id}
            href={`/properties/${property._id}`}
            className="grid relative p-12 max-w-[16rem] aspect-square rounded-lg shadow-lg hover:scale-110 transition-transform duration-200"
          >
            <div className="absolute w-full h-full bg-black brightness-50  shadow-lg rounded-lg">
              <Image
                className="absolute w-full h-full object-cover -z-10  shadow-lg rounded-lg"
                src={property.image}
                alt={property.name}
                width={0}
                height={0}
                sizes="100vw"
              />
            </div>
            <div className="px-4 text-white grid justify-items-center z-10">
              <h3 className="text-center text-3xl font-bold">
                {property.name}
              </h3>
              <div className="flex gap-1">
                <i className="bi-geo-alt-fill" />
                <p className="text-center">{property.location}</p>
              </div>
              <p className="text-center">{property.views.length} views</p>
              <p className="text-center">{`${numFormatter.format(
                property.price.from
              )} - ${numFormatter.format(property.price.to)}`}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
