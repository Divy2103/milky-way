"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Verify({ searchParams: { token } }) {
  const router = useRouter();

  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const verifyToken = async () => {
      setStatus("loading");
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        body: JSON.stringify({ token }),
      });
      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          router.push("/user/sign-in");
        }, 5000);
      } else {
        const error = await res.json();
        setError(error.message);
        setStatus("error");
      }
    };
    verifyToken();
  }, [router, token]);

  useEffect(() => {
    if (status === "success") {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <section className="bg-white h-screen flex items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-lg text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">
            {status === "success"
              ? "Verified"
              : status === "error"
              ? "Error"
              : ""}
          </h1>
          <div className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl capitalize">
            {status === "success" ? (
              "Your email has been verified successfully"
            ) : status === "error" ? (
              "Something went wrong"
            ) : (
              <div
                role="status"
                className="w-full flex justify-center items-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
          <p className="mb-4 text-lg font-light text-gray-500">
            {status === "success" ? (
              <p>
                You will be redirected to the sing in page in {seconds} seconds.
                If you are not redirected, please click{" "}
                <Link
                  href="/authentication/sign-in"
                  className="text-blue-500 font-bold underline"
                >
                  here
                </Link>
              </p>
            ) : status === "error" ? (
              error
            ) : (
              "Please wait while we verify your email"
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
