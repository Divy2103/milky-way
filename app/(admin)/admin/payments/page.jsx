'use client'
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Payment() {
  const people = [
    {
      payment_id: "Krunalabcd",
      date: "12-03-2004",
      email: "Krunal@example.com",
      amount: "123",
      status: "complited",
    },
    {
      payment_id: "Krunalbcd",
      date: "12-03-2004",
      email: "Krunal1@example.com",
      amount: "123",
      status: "failed",
    },
    // More people...
  ];

  return (
    <>
      <div>
        {/* Static sidebar for desktop */}
        <div className="flex flex-col">
          <main className="flex-1 pt-7">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Customers{" "}
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    A list of all the users who use your website, including
                    their name, email, mobile and Address.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Payment_id
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Date
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
                              Amount
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Payment Status
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {people.map((person) => (
                            <tr key={person.email}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {person.payment_id}
                              </td>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {person.date}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {person.email}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {person.amount}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex gap-x-5">
                                <span
                                  className={`rounded-full ${
                                    person.status === "complited"
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                  } bg-green-500 py-3 px-5 text-white cursor-pointer`}
                                >
                                  {person.status}
                                </span>
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
          </main>
        </div>
      </div>
    </>
  );
}
