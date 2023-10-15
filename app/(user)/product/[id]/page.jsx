import Image from "next/image";
import Product from "../.../../../../../database/schema/Product";
import connect from "../../../../database/connection";
import AddToCart from "../../../../components/AddToCart";
import { MinusIcon } from "@heroicons/react/24/solid";

const getProduct = async (id) => {
  await connect();
  const products = await Product.findById(id);
  return JSON.parse(JSON.stringify(products));
};

export default async function ProductPage({ params: { id } }) {
  const product = await getProduct(id);

  return (
    <div className="">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <div className="flex flex-col-reverse">
              <div className="aspect-w-1 aspect-h-1 w-full">
                <Image
                  src={product.image}
                  alt={""}
                  width={800}
                  height={800}
                  className="h-96 w-full object-cover object-center sm:rounded-lg"
                />
              </div>
            </div>

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <div className="flex">
                  <p className="text-3xl font-bold tracking-tight text-gray-900">
                    {product.sellingPrice.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </p>
                  <p className="text-2xl font-semibold tracking-tight text-gray-700 line-through ml-3">
                    {product.mrp.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6 text-base text-gray-700">
                  <p>{product.description}</p>
                </div>
              </div>

              <div className="mt-6">
                <ul>
                  {product.bulletPoints.map((point) => (
                    <li key={point} className="flex items-center">
                      {/* <MinusIcon className="h-4 w-4 text-black text-lg mx-2 my-2"/> {point}- */}
                      &bull; {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <div className="mt-10 flex">
                  <AddToCart id={product._id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
