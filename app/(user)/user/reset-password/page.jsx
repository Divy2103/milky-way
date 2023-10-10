"use client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "sonner";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get("token");

  const router = useRouter();

  const handelSubmit = async (e) => {
    
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { password, ConfirmPass } = Object.fromEntries(formData);
    if (password !== ConfirmPass)
      return toast.error("Passwords do not match", { id: notification });

    const res = await fetch(`/api/auth/forgot-pass?password=${password}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    if (!res.ok) {
      const error = await res.json();
      toast.error(error.data, { id: notification });
    }
    toast.success("Password reset successfully", { id: notification });
    router.push("/authentication/sign-in");
  };

  return (
    <main className="min-h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handelSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="ConfirmPass"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="ConfirmPass"
                  name="ConfirmPass"
                  type="password"
                  autoComplete="ConfirmPass"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="space-y-6">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
