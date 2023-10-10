"use client";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import countries from "../../../static/countries.json";
import Image from "next/image";
import Script from "next/script";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const { data: session, status,update } = useSession();
  const [country, setCountry] = useState(session?.user?.country || "India");
  const [state, setState] = useState(session?.user?.state || "");
  const [data, setData] = useState([]);

  useEffect(() => {
    setCountry(session?.user?.country || countries.countries[0].country);
    setState(session?.user?.state || "");
  }, [session]);

  useEffect(() => {
    const getData = async () => {
      if (!session) return;
      const res = await fetch(`/api/cart?id=${session.user._id}`);
      const data = await res.json();
      setData(data);
    };
    getData();
  }, [session]);

  const handleCheckOut = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/razorpay?id=${session.user._id}`, {
      method: "POST",
      body: JSON.stringify({
        orderDetails: {
          products: data.products,
          mrp: data.mrp,
          total: data.total,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();
    console.log(response);
    if (!res.ok) {
      toast.error(response.error);
      return;
    }
    const options = {
      name: session.user.name,
      currency: response.order.currency,
      amount: response.order.amount,
      order_id: response.order.id,
      description: response.order.amountDesc,
      handler: async function (response) {
        console.log(response);
        const d = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          amount: data.total,
          order: {
            products: data.products,
            mrp: data.mrp,
            total: data.total,
          },
        };

        const res = await fetch(`/api/order?id=${session.user._id}`, {
          method: "POST",
          body: JSON.stringify(d),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status !== 200) {
          toast.error("Something went wrong. Please try again later");
          return;
        }
        toast.success("Order placed successfully");
        update();
        router.push("/");
      },
      prefill: {
        name: session.user.name,
        email: session.user.email,
        contact: session.user.phone,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      console.log(response);
      alert("Payment failed. Please try again. Contact support for help");
    });
  };

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="bg-gray-50">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          <form
            className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
            onSubmit={handleCheckOut}
          >
            <div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Contact information
                </h2>

                <div className="mt-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email-address"
                      disabled={session?.user?.provider === "google"}
                      defaultValue={session?.user?.email ?? ""}
                      name="email-address"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">
                  Shipping information
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        autoComplete="given-name"
                        defaultValue={session?.user?.firstName ?? ""}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        autoComplete="family-name"
                        defaultValue={session?.user?.lastName ?? ""}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="address"
                        name="address"
                        rows={2}
                        autoComplete="address"
                        defaultValue={session?.user?.address ?? ""}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 resize-none"
                      />
                    </div>
                  </div>

                  <div className="col-span-full grid grid-cols-4 gap-4">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          {countries.countries.map((country, i) => (
                            <option key={i} value={country.country}>
                              {country.country}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State
                      </label>
                      <div className="mt-2">
                        <select
                          id="state"
                          name="state"
                          autoComplete="state-name"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          {countries.countries
                            .find((c) => c.country === country)
                            ?.states.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        defaultValue={session?.user?.city ?? ""}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="zipCode"
                        id="zipCode"
                        autoComplete="zipCode"
                        defaultValue={session?.user?.zipCode ?? ""}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        defaultValue={session?.user?.phone ?? ""}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200">
                  {data.products &&
                    data.products.map((product) => (
                      <li key={product.id} className="flex py-6 px-4 sm:px-6">
                        <div className="flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={800}
                            height={800}
                            className="w-20 rounded-md object-cover"
                          />
                        </div>

                        <div className="ml-6 flex flex-1 flex-col">
                          <div className="flex">
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm">
                                <a
                                  href={product.href}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.name}
                                </a>
                              </h4>
                              <p className="mt-1 text-sm text-gray-500">
                                Qty: {product.quantity}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.description.slice(0, 10)}...
                              </p>
                            </div>

                            <div className="">
                              <p className="flex flex-col">
                                {product.sellingPrice.toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                })}
                                <span className="text-gray-500 text-sm line-through">
                                  {product.mrp.toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                  })}
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-1 items-end justify-between pt-2">
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {product.price}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
                <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {data.mrp &&
                        data.mrp.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Discount</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {data.total &&
                        (data.mrp - data.total).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      {data.total &&
                        data.total.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-blue-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Confirm order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
