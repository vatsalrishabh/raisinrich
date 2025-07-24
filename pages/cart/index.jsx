import Title from "../../components/ui/Title";
import { useSelector, useDispatch } from "react-redux";
import {
  quantityDecrease,
  quantityIncrease,
  reset,
  removeProduct,
} from "../../redux/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { updateForm, resetForm } from "../../redux/subscription/subscriptionSlice";
import { FaRupeeSign, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaUtensils, FaLeaf } from "react-icons/fa";

const Cart = ({ userList }) => {
  const { data: session } = useSession();
  const cart = useSelector((state) => state.cart);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = userList?.find((user) => user.email === session?.user?.email);
  const subscription = useSelector((state) => state.subscription.form);

  const [productState, setProductState] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [region, setRegion] = useState("");
  const [showAddress, setShowAddress] = useState(false);

  const planPrices = {
    "7 days": 1200,
    "15 days": 2200,
    "30 days": 4000,
    "60 days": 7000,
    "90 days": 9000,
  };
  const subscriptionTotal =
    subscription && subscription.days
      ? planPrices[subscription.days] ||
        (subscription.goal === "Detox/Cut Diets"
          ? 2500
          : subscription.goal === "Gain Muscle"
          ? 12000
          : 0)
      : 0;

  const cartSubtotal = cart.total + subscriptionTotal;
  const sgst = +(cartSubtotal * 0.025).toFixed(2);
  const cgst = +(cartSubtotal * 0.025).toFixed(2);
  const totalWithTax = (cartSubtotal + sgst + cgst).toFixed(2);

  useEffect(() => {
    const productTitles = cart.products.map((product) => ({
      title: product.title,
      foodQuantity: product.foodQuantity,
      extras: product.extras,
      price: product.price,
      image: product.image,
      subtotal: product.price * product.foodQuantity,
    }));
    setProductState(productTitles);
  }, [cart.products]);

  // const createOrder = async () => {
  //   try {
  //     if (session) {
  //       if (confirm("Are you sure you want to create this order?")) {
  //         const res = await axios.post(
  //           `${process.env.NEXT_PUBLIC_API_URL}/orders`,
  //           {
  //             customer: user?.fullName,
  //             address: address || "No address",
  //             total: totalWithTax,
  //             products: productState,
  //             method: 0,
  //           }
  //         );
  //         if (res.status === 201) {
  //           router.push(`/order/${res.data._id}`);
  //           dispatch(reset());
  //           toast.success("Order created successfully");
  //         }
  //       }
  //     } else {
  //       router.push("/auth/login");
  //       throw new Error("You must be logged in to create an order");
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //     console.log(error);
  //   }
  // };

  const handleRazorpayPayment = async () => {
    // Prepare all data
    const orderData = {
      products: productState,
      subscription,
      address: {
        address: address || subscription.address,
        city: city || subscription.city,
        state: region || subscription.state,
        country: subscription.country,
        postcode: postcode || subscription.zipCode,
        phone: subscription.phone,
        email: subscription.email,
        name: subscription.fullName,
      },
      total: totalWithTax,
    };

    // 1. Create Razorpay order on server
    const res = await axios.post("/api/payment/createOrder", { orderData});
    const { id: order_id, currency, amount } = res.data;

    // 2. Open Razorpay checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount,
      currency: currency,
      name: "Raisinrich",
      description: "Order Payment",
      order_id: order_id,
      handler: async function (response) {
        // 3. On success, create order in your DB
        await axios.post(`/api/payment/verifyPayment`, {
          ...orderData,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          method: 1, // Razorpay
        });
        toast.success("Payment successful! Order placed.");
        dispatch(reset());
        dispatch(resetForm());
        // router.push("/orders");
      },
      prefill: {
        name: orderData.address.name,
        email: orderData.address.email,
        contact: orderData.address.phone,
      },
      notes: {
        address: `${orderData.address.address}, ${orderData.address.city}, ${orderData.address.state}, ${orderData.address.country} - ${orderData.address.postcode}`,
      },
      theme: {
        color: "#fbbf24",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const quantityChange = (type, product) => {
    if (type === 0) {
      dispatch(quantityDecrease(product));
    }
    if (type === 1) {
      dispatch(quantityIncrease(product));
    }
  };

  const handleRemove = (product) => {
    dispatch(removeProduct(product));
  };

  return (
    <div className="min-h-[calc(100vh_-_433px)] bg-[#18181b] py-8 px-2">
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* Left: Subscription Card + Cart Table */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Subscription Plan Card */}
          {subscription && subscription.fullName && (
            <div className="bg-gradient-to-r from-yellow-100 via-yellow-50 to-white border-l-4 border-yellow-400 rounded-xl shadow p-6 mb-2 animate-fade-in">
              <div className="flex items-center gap-4 mb-3">
                <Image
                  width={64}
                  height={64}
                  src="/images/meal-plan.png"
                  alt="Subscription Plan"
                  className="w-16 h-16 object-cover rounded shadow border border-yellow-200"
                />
                <div>
                  <div className="text-xl font-bold text-yellow-700 flex items-center gap-2">
                    {subscription.goal} Plan
                  </div>
                  <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-blue-400" />
                      <b>Duration:</b> {subscription.days}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUtensils className="text-orange-400" />
                      <b>Meal Times:</b>{" "}
                      {Array.isArray(subscription.mealTimes) && subscription.mealTimes.length > 0
                        ? subscription.mealTimes.join(", ")
                        : "—"}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaLeaf className="text-green-400" />
                      <b>Type:</b> {subscription.dietType}
                    </div>
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-end">
                  <span className="text-lg font-bold text-yellow-700 flex items-center gap-1">
                    <FaRupeeSign className="text-yellow-400" />
                    {subscriptionTotal}
                  </span>
                  <span className="text-xs text-gray-500">Plan Price</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-6 mt-2 text-sm text-gray-800">
                <div className="flex items-center gap-1">
                  <FaUser className="text-yellow-400" />
                  <b>Name:</b> {subscription.fullName}
                </div>
                <div className="flex items-center gap-1">
                  <FaEnvelope className="text-blue-400" />
                  <b>Email:</b> {subscription.email}
                </div>
                <div className="flex items-center gap-1">
                  <FaPhone className="text-green-400" />
                  <b>Phone:</b> {subscription.phone}
                </div>
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-pink-400" />
                  <b>Address:</b> {subscription.address}, {subscription.city}, {subscription.state}, {subscription.country} - {subscription.zipCode}
                </div>
              </div>
            </div>
          )}

          {/* Cart Table */}
          <div className="bg-white rounded-xl shadow p-4">
            <Title addClass="text-2xl mb-2 text-[#18181b]">Your Cart</Title>
            {cart.products.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-center text-gray-700 min-w-[700px]">
                  <thead className="bg-gray-200 text-xs uppercase">
                    <tr>
                      <th className="py-3 px-2"></th>
                      <th className="py-3 px-2">Thumbnail</th>
                      <th className="py-3 px-2">Product</th>
                      <th className="py-3 px-2">Price</th>
                      <th className="py-3 px-2">Quantity</th>
                      <th className="py-3 px-2">Subtotal</th>
                      <th className="py-3 px-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.products.map((product) => (
                      <tr key={product._id} className="border-b hover:bg-yellow-50 transition-all">
                        <td className="py-2 px-2">
                          <button
                            className="text-red-500 text-lg font-bold hover:scale-125 transition-transform"
                            onClick={() => handleRemove(product)}
                            title="Remove"
                          >
                            ×
                          </button>
                        </td>
                        <td className="py-2 px-2">
                          <Image
                            width={64}
                            height={64}
                            src={
                              product.image?.src ||
                              product.image ||
                              "/images/placeholder.png"
                            }
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="py-2 px-2 font-semibold text-left">
                          <div>{product.title}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            <div>
                              <b>Plan:</b> Customised Weight Loss/Muscle Gain Meal Plan
                            </div>
                            <div>
                              <b>Duration:</b> 4 Weeks
                            </div>
                            <div>
                              <b>Meals/Day:</b> 4 Meals
                            </div>
                            <div>
                              <b>Type:</b> Eggetarian
                            </div>
                            {product.extras.length > 0 && (
                              <div>
                                <b>Extras:</b>{" "}
                                {product.extras.map((item) => item.text).join(", ")}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-2 px-2 font-medium">₹{product.price}</td>
                        <td className="py-2 px-2 font-medium">
                          <button
                            onClick={() => quantityChange(0, product)}
                            className="px-2 text-lg text-primary hover:text-yellow-500 transition"
                          >
                            <i className="fa-solid fa-chevron-left" />
                          </button>
                          <span className="mx-2">{product.foodQuantity}</span>
                          <button
                            onClick={() => quantityChange(1, product)}
                            className="px-2 text-lg text-primary hover:text-yellow-500 transition"
                          >
                            <i className="fa-solid fa-chevron-right" />
                          </button>
                        </td>
                        <td className="py-2 px-2 font-medium">
                          ₹{product.price * product.foodQuantity}
                        </td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : !subscription?.fullName ? (
              <div className="flex flex-col items-center justify-center h-full py-16">
                <h1 className="text-2xl font-semibold text-gray-700">No products or subscription in your cart</h1>
                <button
                  className="btn-primary mt-4"
                  onClick={() => router.push("/menu")}
                >
                  Go to menu
                </button>
              </div>
            ) : null}

            {/* Coupon */}
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-6">
              <label className="font-semibold">Coupon:</label>
              <input
                type="text"
                className="border px-3 py-2 rounded w-48"
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button className="btn-primary px-4 py-2">Apply coupon</button>
              <button className="btn-primary px-4 py-2">Update cart</button>
            </div>
          </div>
        </div>

        {/* Right: Cart Totals & Address */}
        <div className="bg-white rounded-xl shadow p-8 w-full max-w-md flex flex-col gap-4 self-start">
          <Title addClass="text-2xl mb-2 text-[#18181b]">Cart totals</Title>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{cartSubtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Delivery Charges (Free)</span>
          </div>
          <div className="flex justify-between">
            <span>SGST</span>
            <span>₹{sgst}</span>
          </div>
          <div className="flex justify-between">
            <span>CGST</span>
            <span>₹{cgst}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{totalWithTax}</span>
          </div>
          <button
            className="btn-primary mt-4 w-full"
            onClick={handleRazorpayPayment}
            disabled={cart.products.length === 0 && !subscription.fullName}
          >
            Pay with Razorpay
          </button>
          <button
            className="text-blue-600 underline text-left mt-2"
            onClick={() => setShowAddress((v) => !v)}
          >
            Change address
          </button>
          {showAddress && (
            <div className="flex flex-col gap-2 mt-2">
              <label>
                Country / region:
                <input
                  type="text"
                  className="border px-2 py-1 rounded w-full"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </label>
              <label>
                State / County: *
                <input
                  type="text"
                  className="border px-2 py-1 rounded w-full"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </label>
              <label>
                City: *
                <input
                  type="text"
                  className="border px-2 py-1 rounded w-full"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </label>
              <label>
                Postcode / ZIP: *
                <input
                  type="text"
                  className="border px-2 py-1 rounded w-full"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  required
                />
              </label>
              <button className="btn-primary mt-2">Update</button>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
};

// export const getServerSideProps = async () => {
//   const res = await axios.get(`/api/users`);
//   return {
//     props: {
//       userList: res.data ? res.data : [],
//     },
//   };
// };

export default Cart;
