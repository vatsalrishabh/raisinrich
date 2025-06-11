import { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const statusColors = {
    pending: "bg-yellow-400 text-black",
    paid: "bg-green-500 text-white",
    failed: "bg-red-500 text-white",
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        // Direct API call since this is a Next.js internal API route
        const res = await axios.get("/api/admin/foodOrders?role=admin");
        setOrders(res.data.orders || []);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5  lg:max-w-[70%] xl:max-w-none flex flex-col justify-center overflow-x-auto">
      <Title addClass="text-[40px]">Diet Orders</Title>
      <div className="overflow-x-auto w-full mt-5">
        <table className="min-w-[900px] w-full text-sm text-center text-gray-500">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th className="py-3 px-6">ORDER ID</th>
              <th className="py-3 px-6">CUSTOMER</th>
              <th className="py-3 px-6">GOAL</th>
              <th className="py-3 px-6">DIET TYPE</th>
              <th className="py-3 px-6">MEAL TIMES</th>
              <th className="py-3 px-6">AMOUNT</th>
              <th className="py-3 px-6">STATUS</th>
              <th className="py-3 px-6">PAYMENT ID</th>
              <th className="py-3 px-6">CONTACT</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order) => (
                  <tr
                    className="transition-all bg-secondary border-gray-700 hover:bg-primary"
                    key={order._id}
                  >
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order._id.substring(0, 7)}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order.planDetails?.fullName}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order.planDetails?.goal}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order.planDetails?.dietType}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {(order.planDetails?.mealTimes || []).join(", ")}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      ₹{order.amount}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full font-bold ${statusColors[order.status] || "bg-gray-400 text-white"}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order.razorpayPaymentId}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order.planDetails?.phone} <br />
                      {order.planDetails?.email}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
