"use client";
import { PhotoIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";

export default function AddProduct() {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [bulletPoints, setBulletPoints] = useState([""]);
  const [image, setImage] = useState(undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    bulletPoints.forEach((bulletPoint, index) => {
      formData.append(`bulletPoints`, bulletPoint);
    });

    const res = await fetch("/api/inventory", {
      method: "POST",
      body: formData,
    });
    console.log(res);
    const response = await res.json();
    console.log(response);
    toast.success("Product added successfully");
    router.push("/admin/products");
    router.refresh();
  };

  const getCategory = async () => {
    const res = await fetch("/api/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const response = await res.json();
    setCategories(response.categories);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <main className="min-h-screen">
      <div className="flex justify-end">
        <Link
          href="/admin/categories"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
        >
          Add Category
        </Link>
      </div>
      <form className="max-w-7xl" onSubmit={handleSubmit} id="form">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex justify-between">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Basic Details
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Category
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600">
                    <select
                      name="category"
                      id="category"
                      autoComplete="category"
                      className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:ring-blue-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option value={category._id} key={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-span-2" />
              <div className="sm:col-span-2">
                <label
                  htmlFor="mrp"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  MRP
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600">
                    <input
                      type="text"
                      name="mrp"
                      id="mrp"
                      autoComplete="mrp"
                      className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="sellingPrice"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Selling Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600">
                    <input
                      type="text"
                      name="sellingPrice"
                      id="sellingPrice"
                      autoComplete="sellingPrice"
                      className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
             
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Descriptions
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product description
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600">
                    <textarea
                      name="description"
                      id="description"
                      autoComplete="description"
                      rows={4}
                      className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Bullet Points
                  <button
                    type="button"
                    className="ml-5 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    onClick={() => {
                      setBulletPoints([...bulletPoints, ""]);
                    }}
                  >
                    <PlusIcon className="h-3 w-3 text-white" />
                  </button>
                </label>
                {bulletPoints.map((bulletPoint, index) => (
                  <div
                    key={index}
                    className="mt-2 grid col-span-full grid-cols-6 gap-5"
                  >
                    <div className="col-span-5 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600">
                      <input
                        type="text"
                        name="bulletPoint"
                        id="bulletPoint"
                        value={bulletPoint}
                        onChange={(e) => {
                          const newBulletPoints = [...bulletPoints];
                          newBulletPoints[index] = e.target.value;
                          setBulletPoints(newBulletPoints);
                        }}
                        autoComplete="bulletPoint"
                        className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        onClick={() => {
                          setBulletPoints([
                            ...bulletPoints.slice(0, index),
                            ...bulletPoints.slice(index + 1),
                          ]);
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Images
              <div className="w-72 mt-5">
                <label
                  htmlFor="image"
                  className="relative col-span-2 aspect-1 flex justify-center items-center flex-col w-full rounded-lg border-2 border-dashed cursor-pointer border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {image ? (
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="selected image"
                      width={200}
                      height={200}
                      className="absolute h-full w-full object-cover rounded-lg top-0 left-0 -z-10"
                    />
                  ) : (
                    <>
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <span className="mt-2 block text-sm font-bold text-gray-900">
                        Cover Image
                      </span>
                    </>
                  )}
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    className="sr-only"
                  />
                </label>
              </div>
            </h2>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Add Product
          </button>
        </div>
      </form>
    </main>
  );
}
