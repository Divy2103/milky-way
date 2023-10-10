"use client";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
const AddToCart = ({ id, className }) => {
  const { data: session, status, update } = useSession();

  const handleAddToCart = async () => {
    if (!session) return toast.error("Please sign in to add to cart");

    const res = await fetch(`/api/cart?id=${session.user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
        quantity: 1,
      }),
    });
    toast.success("Added to cart");
    update();
  };

  return (
    <>
      <button
        type="submit"
        onClick={handleAddToCart}
        className={`flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-blue-600 py-3 px-8 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full ${className}`}
      >
        Add to cart
      </button>
    </>
  );
};

export default AddToCart;
