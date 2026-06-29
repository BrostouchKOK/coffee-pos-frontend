import React from "react";

const Receipt = React.forwardRef(({ order, settings }, ref) => {
  return (
    <div
      ref={ref}
      className="receipt w-[80mm] bg-white text-black p-4 font-mono text-sm"
    >
      {/* SHOP INFO */}

      <div className="text-center">
        {settings?.logo && (
          <img
            src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${settings?.logo}`}
            alt="logo"
            className="w-20 h-20 mx-auto object-contain"
          />
        )}

        <h2 className="font-bold text-lg">
          {settings?.cafeName || "Coffee Shop"}
        </h2>

        <p>{settings?.phone || ""}</p>
      </div>

      <hr className="my-3" />

      <p>Order ID: {order?._id}</p>

      <p>Date: {new Date().toLocaleString()}</p>

      <hr className="my-3" />

      {order?.items?.map((item, index) => (
        <div key={index} className="flex justify-between">
          <span>
            {item.name || item.product?.name}

            {" x "}

            {item.quantity}
          </span>

          <span>${Number(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}

      <hr className="my-3" />

      <div className="flex justify-between font-bold">
        <span>Total</span>

        <span>
          ${Number(order?.total || order?.totalAmount || 0).toFixed(2)}
        </span>
      </div>

      <div className="text-center mt-5">
        <p>Thank you ❤️</p>

        <p>Come again!</p>
      </div>
    </div>
  );
});

export default Receipt;
