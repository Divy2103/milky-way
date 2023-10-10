"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const InventoryTable = ({ products: data }) => {
  const router = useRouter();

  const deleteProduct = async (id) => {
    toast.promise(
      fetch(`/api/inventory?id=${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => router.refresh()),
      {
        loading: "Deleting Product",
        success: "Product Deleted",
        error: "Error Deleting Product",
      }
    );
  };

  return (
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
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    _id
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Product Description
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
                {data.map((product, i) => (
                  <tr key={product.hsnCode + i}>
                    <td className="whitespace-nowrap py-4 pr-3 pl-4 text-sm sm:pl-6">
                      <div className="flex items-center">
                        <div className="h-14 w-12 flex-shrink-0">
                          <Image
                            className="h-full w-full object-cover"
                            src={product.image}
                            width={200}
                            height={200}
                            alt=""
                          />
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product._id}
                    </td>
                    <td className=" px-3 py-4 text-sm text-gray-500">
                      {product.name}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {product.description.slice(0, 50) + "..."}
                    </td>

                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4  text-sm font-medium sm:pr-6">
                      <button
                        type="button"
                        onClick={() => deleteProduct(product._id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Delete
                        <span className="sr-only">, {product.name}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
