import AddCategoryButton from "../../../../components/admin/AddCategoryButton";
import { DeleteCategory } from "../../../../components/admin/CategoryAction";
import connect from "../../../../database/connection";
import categories from "../../../../database/schema/Category";
import Image from "next/image";

const getCategories = async () => {
  await connect();
  const allCategory = await categories.find({});
  const allCategoryJson = JSON.parse(JSON.stringify(allCategory));
  return allCategoryJson;
};

export const dynamic = "force-dynamic";

export default async function Categories() {
  const data = await getCategories();

  return (
    <div className="">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Categories List
          </h1>
        </div>
        <AddCategoryButton />
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
                      Id
                    </th>
                    <th scope="col" className="relative py-3.5 px-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-left"
                    >
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((category, i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap py-4 pr-3 pl-4 text-sm sm:pl-6">
                        {category.name}
                      </td>
                      <td className=" px-3 py-4 text-sm text-gray-500">
                        {category._id}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4  text-sm font-medium sm:pr-6">
                        <DeleteCategory category={category} />
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
