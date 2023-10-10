import Image from "next/image";
import Product from "../../../database/schema/Product";
import connect from "../../../database/connection";
import Link from "next/link";

const getData = async () => {
  await connect();
  const products = await Product.find();
  return JSON.parse(JSON.stringify(products));
};

export default async function ProductPage() {
  const products = await getData();

  return (
    <div className="bg-white my-7">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative border-r border-y border-gray-200 p-4 sm:p-6"
            >
              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={800}
                  height={800}
                  className="h-64 w-full object-cover object-center border"
                />
              </div>
              <div className="pt-10 pb-4 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link href={`/product/${product._id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-4 text-base font-medium text-gray-900">
                  {product.sellingPrice.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}{" "}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
