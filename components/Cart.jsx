import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";

export default function Cart({ open, setOpen, user }) {
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState([]);

  const removeFromCart = async (id) => {
    setLoading(true);
    await fetch(`/api/cart?id=${user._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });
    setToggle(!toggle);
    setLoading(false);
    toast.success("Removed from cart");
  };

  const updateCart = async (id, quantity) => {
    const res = await fetch(`/api/cart?id=${user._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId: id, quantity }),
    });
    setToggle(!toggle);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await fetch(`/api/cart?id=${user._id}`);
      const data = await res.json();
      setData(data);
      setLoading(false);
    };
    getData();
  }, [user, toggle]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {loading && <p></p>}
                            {data.products &&
                              data.products.map((product) => (
                                <li key={product._id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                      src={product.image}
                                      alt={product.name}
                                      width={800}
                                      height={800}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={`/product/${product._id}`}>
                                            {product.name}
                                          </a>
                                        </h3>
                                        <p className="ml-4">
                                          {product.sellingPrice.toLocaleString(
                                            "en-IN",
                                            {
                                              style: "currency",
                                              currency: "INR",
                                            }
                                          )}{" "}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.description.slice(0, 10)}...
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="text-gray-500 flex justify-center items-center">
                                        <p className="mr-3">Qty</p>
                                        <div className="flex">
                                          <button
                                            type="button"
                                            onClick={() => {
                                              if (product.quantity === 1)
                                                return;
                                              updateCart(product._id, -1);
                                            }}
                                            disabled={product.quantity === 1}
                                            className="font-medium text-blue-600 hover:text-blue-500 border px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                          >
                                            -
                                          </button>
                                          <p className="px-2 border-y py-1">
                                            {product.quantity}
                                          </p>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              updateCart(product._id, 1)
                                            }
                                            className="font-medium text-blue-600 hover:text-blue-500 border px-2 py-1"
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            removeFromCart(product._id)
                                          }
                                          className="font-medium text-blue-600 hover:text-blue-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>
                          {!loading &&
                            data.total.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link href="/checkout">
                          <button
                            type="button"
                            className="w-full flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
                            onClick={() => setOpen(false)}
                          >
                            Checkout
                          </button>
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-blue-600 hover:text-blue-500"
                            onClick={() => setOpen(false)}
                          >
                            <Link href="/products">Continue Shopping</Link>
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
