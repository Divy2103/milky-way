import Product from "../../../../database/schema/Product";
import connect from "../../../../database/connection";
import InventoryTable from "../../../../components/admin/InventoryTable";
import Link from "next/link";

const getData = async () => {
  connect();
  const products = await Product.find({});
  return JSON.parse(JSON.stringify(products));
};

export const dynamic = "force-dynamic";

export default async function ProductAdmin() {
  const data = await getData();

  return (
    <div className="">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Products</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/admin/products/add"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Product
          </Link>
        </div>
      </div>
      <InventoryTable products={data} />
    </div>
  );
}
