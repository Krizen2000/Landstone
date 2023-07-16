export default function VisitorsSection() {
  return (
    <section className="grid gap-5">
      <div className="flex flex-wrap gap-2 justify-center">
        <div className="flex items-center gap-2">
          <p>Sort:</p>
          <select className="bg-white px-2 py-1 border-2 border-yellow-500 rounded-full cursor-pointer hover:bg-yellow-500 hover:text-white">
            <option>Asc</option>
            <option>Desc</option>
          </select>
          <p>Filter:</p>
          <select className="bg-white px-2 py-1 border-2 border-yellow-500 rounded-full cursor-pointer hover:bg-yellow-500 hover:text-white">
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
                Name
              </th>
              <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
                Range
              </th>
              <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
                Location
              </th>
              <th className="px-8 py-3 text-white whitespace-nowrap text-lg">
                Interested
              </th>
            </tr>
          </thead>
          <tbody className="px-3 py-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (_, inx) => (
                <tr
                  className={[
                    "px-3 py-1",
                    inx % 2 == 1 ? "bg-green-200" : "bg-green-50",
                  ].join(" ")}
                >
                  <td className="px-3 py-2 text-sm text-center">garage</td>
                  <td className="px-3 py-2 text-sm text-center">art</td>
                  <td className="px-3 py-2 text-sm text-center">went</td>
                  <td className="px-3 py-2 text-sm text-center">powder</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
