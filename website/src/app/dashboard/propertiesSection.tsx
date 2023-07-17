import { useAppSelector } from "@/redux/hooks";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type Property = {
  _id: string;
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
  visibility: boolean;
  views: string[];
  interested: string[];
};
async function requestProperties(agentId: string): Promise<Property[] | null> {
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

async function requestPropertyDeletion(propertyId: string, token: string) {
  let axiosInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });
  try {
    await axiosInstance.delete(`/api/properties/${propertyId}`);
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}

const numFormatter = Intl.NumberFormat("en", { notation: "compact" });
export default function PropertiesSection() {
  const { agentId, token } = useAppSelector((state) => ({
    agentId: state.personalInfo.agentId,
    token: state.token,
  }));
  const [properties, setProperties] = useState(Array<Property>());

  const deleteAction = (propertyId: string, name: string) => {
    const condition = confirm(`Do you want to delete Property ${name}?`);
    if (!condition || !token) return;
    requestPropertyDeletion(propertyId, token).then((result) => {
      if (!result) {
        alert("Can't delete the Property!");
        return;
      }
      alert(`Deleted Property ${name} successfully!`);
    });
  };

  useEffect(() => {
    if (!agentId) {
      alert("UnAuthorized Access");
      return;
    }
    requestProperties(agentId).then((properties) => {
      if (!properties) return;
      setProperties(properties);
    });
  }, []);

  return (
    <section className="grid gap-5">
      <div className="flex flex-wrap gap-2 justify-center">
        <div className="flex items-center gap-2">
          <p>Sort:</p>
          <select className="bg-white px-2 py-1 border-2 border-blue-500 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white">
            <option>Name</option>
            <option>Desc</option>
          </select>
          <p>Filter:</p>
          <select className="bg-white px-2 py-1 border-2 border-blue-500 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white">
            <option>1</option>
            <option>12</option>
          </select>
        </div>
        <input className="px-4 py-1 border-2 border-gray-300 rounded-full lg:w-1/2" />
      </div>
      <div className="relative overflow-x-auto w-full max-h-[80vh] rounded-lg border-2 border-gray-300 shadow-md">
        <table className="w-full border-spacing-10 bg-white">
          <caption className="px-6 py-2 text-start text-white bg-green-700">
            Properties
          </caption>
          <thead className="px-3 py-1 sticky top-0 bg-green-500">
            <tr className="px-3 py-1">
              <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
                Name
              </th>
              <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
                Type
              </th>
              <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
                Range
              </th>
              <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
                Location
              </th>
              <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
                Visibility
              </th>
              <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="px-3 py-1">
            {properties.map((property, inx) => (
              <tr
                key={property._id}
                className={[
                  "px-3 py-1",
                  inx % 2 == 1 ? "bg-green-200" : "bg-green-50",
                ].join(" ")}
              >
                <td className="px-3 py-2 text-sm text-center underline text-blue-600">
                  <Link href={`/properties/${property._id}`}>
                    {property.name}
                  </Link>
                </td>
                <td className="px-3 py-2 text-sm text-center">
                  {property.type}
                </td>
                <td className="px-3 py-2 text-sm text-center">
                  {numFormatter.formatRange(
                    property.price.from,
                    property.price.to
                  )}
                </td>
                <td className="px-3 py-2 text-sm text-center">
                  {property.location}
                </td>
                <td className="px-3 py-2 text-sm text-center">
                  {String(property.visibility)}
                </td>
                <td className="flex justify-center gap-3 px-3 py-2 text-sm text-center">
                  <Link href={`/dashboard/edit/${property._id}`}>
                    <i className="bi-pencil-fill text-green-500 text-lg" />
                  </Link>
                  <button
                    onClick={() => deleteAction(property._id, property.name)}
                    className="flex justify-center"
                  >
                    <i className="bi-trash-fill text-red-500 text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
