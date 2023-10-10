import connect from "../../../../database/connection";
import User from "../../../../database/schema/User";

const getUsers = async () => {
  await connect();
  const allUSer = await User.find({});
  const allUSerJson = JSON.parse(JSON.stringify(allUSer));
  return allUSerJson;
};

export const dynamic = "force-dynamic";

export default async function Categories() {
  const data = await getUsers();

  return (
    <div className="">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle md:px-2">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="pr-3 pl-4 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Gender
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-left"
                    >
                      Address
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((category, i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap py-4 pr-3 pl-4 text-sm sm:pl-6">
                        {category.firstName + " " + category.lastName}
                      </td>
                      <td className=" px-3 py-4 text-sm text-gray-500">
                        {category.email}
                      </td>
                      <td className=" px-3 py-4 text-sm text-gray-500">
                        {category.gender}
                      </td>
                      <td className=" px-3 py-4 text-sm text-gray-500">
                        {category.address +
                          " " +
                          category.city +
                          " " +
                          category.state +
                          " " +
                          category.zipCode}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
