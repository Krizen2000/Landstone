import Link from "next/link";

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
const numFormatter = Intl.NumberFormat("en", { notation: "compact" });

type Props = { interestedProperties: PropertyType[] };
export default function InterestedProperties({ interestedProperties }: Props) {
  return (
    <section className="relative overflow-x-auto w-full max-h-[80vh] rounded-lg border-2 border-gray-300 shadow-md">
      <table className="w-full border-spacing-10 bg-white">
        <caption className="px-6 py-2 text-start text-white bg-green-700">
          Interested
        </caption>
        <thead className="px-3 py-1 sticky top-0 bg-green-500">
          <tr className="px-3 py-1">
            <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
              Name
            </th>
            <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
              Range
            </th>
            <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
              Location
            </th>
            <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
              Type
            </th>
          </tr>
        </thead>
        <tbody className="px-3 py-1">
          {interestedProperties
            ? interestedProperties.map((property, inx) => (
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
                    {numFormatter.formatRange(
                      property.price.from,
                      property.price.to
                    )}
                  </td>
                  <td className="px-3 py-2 text-sm text-center">
                    {property.location}
                  </td>
                  <td className="px-3 py-2 text-sm text-center">
                    {property.type}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </section>
  );
}
