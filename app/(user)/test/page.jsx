"use client";
import Script from "next/script";

export default function Test() {
  const makePayment = async ({ productId = null }) => {
    const res = await fetch("/api/razorpay?id=6518f87ff91ea4b21194a9e9", {
      method: "POST",
      body: JSON.stringify({
        orderDetails: {
          products: [
            {
              _id: "6518f51ff91ea4b21194a9d4",
              name: "Cow Dudh",
              category: "651870051bf8a6210b5091e4",
              image:
                "https://firebasestorage.googleapis.com/v0/b/milky-way-89101.appspot.com/o/inventory%2FScreenshot%202023-09-01%20140808.png.Sun%20Oct%2001%202023%2009%3A57%3A09%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=dd002569-eae7-4de7-81b7-35b3ba266412",
              description: "Testy and creamy Amul Dudh",
              mrp: 50,
              sellingPrice: 44,
              quantity: 10,
              bulletPoints: ["Point 1", "Point 2"],
              __v: 0,
            },
          ],
          mrp: 150,
          total: 132,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    const options = {
      name: "Jay Keraliya",
      currency: data.order.currency,
      amount: data.order.amount,
      order_id: data.order.id,
      description: data.order.amountDesc,
      // image: logoBase64,
      handler: function (response) {
        console.log(response);
      },
      prefill: {
        name: "John Doe",
        email: "jdoe@example.com",
        contact: "9876543210",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again. Contact support for help");
    });
  };

  return (
    <main>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <button
        onClick={() => {
          makePayment({ productId: "example_ebook" });
        }}
      >
        Buy
      </button>
    </main>
  );
}
