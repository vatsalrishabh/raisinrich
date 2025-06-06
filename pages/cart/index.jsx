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

const Cart = ({ userList }) => {
  const { data: session } = useSession();
  const cart = useSelector((state) => state.cart);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = userList?.find((user) => user.email === session?.user?.email);

  const [productState, setProductState] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [region, setRegion] = useState("");
  const [showAddress, setShowAddress] = useState(false);

  // Tax calculation (example: 5% SGST + 5% CGST)
  const sgst = +(cart.total * 0.025).toFixed(2);
  const cgst = +(cart.total * 0.025).toFixed(2);
  const totalWithTax = (cart.total + sgst + cgst).toFixed(2);

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

  const createOrder = async () => {
    try {
      if (session) {
        if (confirm("Are you sure you want to create this order?")) {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/orders`,
            {
              customer: user?.fullName,
              address: address || "No address",
              total: totalWithTax,
              products: productState,
              method: 0,
            }
          );
          if (res.status === 201) {
            router.push(`/order/${res.data._id}`);
            dispatch(reset());
            toast.success("Order created successfully");
          }
        }
      } else {
        router.push("/auth/login");
        throw new Error("You must be logged in to create an order");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
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
    <div className="min-h-[calc(100vh_-_433px)] bg-gray-50 py-6">
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* Cart Table */}
        <div className="flex-1 overflow-x-auto">
          <Title addClass="text-3xl mb-4">Your Cart</Title>
          {cart.products.length > 0 ? (
            <table className="w-full text-sm text-center text-gray-700 bg-white rounded-xl shadow overflow-hidden min-w-[700px]">
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
                  <tr key={product._id} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-2">
                      <button
                        className="text-red-500 text-lg font-bold"
                        onClick={() => handleRemove(product)}
                        title="Remove"
                      >
                        ×
                      </button>
                    </td>
                    <td className="py-2 px-2">
                      <img
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
                      {/* Custom fields example */}
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
                        className="px-2 text-lg text-primary"
                      >
                        <i className="fa-solid fa-chevron-left" />
                      </button>
                      <span className="mx-2">{product.foodQuantity}</span>
                      <button
                        onClick={() => quantityChange(1, product)}
                        className="px-2 text-lg text-primary"
                      >
                        <i className="fa-solid fa-chevron-right" />
                      </button>
                    </td>
                    <td className="py-2 px-2 font-medium">
                      ₹{product.price * product.foodQuantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-16">
              <h1 className="text-2xl font-semibold">Your cart is empty</h1>
              <button
                className="btn-primary mt-4"
                onClick={() => router.push("/menu")}
              >
                Go to menu
              </button>
            </div>
          )}

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

        {/* Cart Totals & Address */}
        <div className="bg-white rounded-xl shadow p-8 w-full max-w-md flex flex-col gap-4">
          <Title addClass="text-2xl mb-2">Cart totals</Title>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{cart.total}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Delivery Charges (Free)</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping to</span>
            <span>Delhi.</span>
          </div>
          <button
            className="text-blue-600 underline text-left"
            onClick={() => setShowAddress((v) => !v)}
          >
            Change address
          </button>
          {showAddress && (
            <div className="flex flex-col gap-2">
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
            onClick={createOrder}
            disabled={cart.products.length === 0}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  return {
    props: {
      userList: res.data ? res.data : [],
    },
  };
};

export default Cart;
