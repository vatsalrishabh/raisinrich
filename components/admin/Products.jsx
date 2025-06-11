import { useEffect, useState } from "react";
import Title from "../ui/Title";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import AddDietPlanForm from "./AddDietPlanForm";

const mealNames = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "eveningSnack", label: "Evening Snack" },
  { key: "dinner", label: "Dinner" },
];

const Products = () => {
  const [dietPlans, setDietPlans] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const getDietPlans = async () => {
    try {
      const res = await axios.get("/api/dietplans");
      setDietPlans(res.data.dietPlans);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch diet plans");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this diet plan?")) {
        const res = await axios.delete("/api/dietplans/delete", {
          data: { id },
        });

        if (res.status === 200) {
          toast.success("Diet plan deleted successfully");
          getDietPlans();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting the plan");
    }
  };

  useEffect(() => {
    getDietPlans();
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <Title addClass="text-[32px]">Diet Plans</Title>
        <button
          className="btn-primary px-5 py-2 rounded-lg bg-yellow-400 text-[#18181b] font-bold shadow hover:bg-yellow-300 transition-all"
          onClick={() => setShowAddModal(true)}
        >
          + Add Diet Plan
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-xl shadow border border-gray-700 bg-[#23232b]">
        <table className="min-w-[900px] w-full text-sm text-center text-gray-200">
          <thead className="sticky top-0 z-10 text-xs uppercase bg-[#18181b] text-yellow-400">
            <tr>
              <th className="py-3 px-4">Day</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Category</th>
              {mealNames.map((meal) => (
                <th key={meal.key} className="py-3 px-4">
                  {meal.label}
                </th>
              ))}
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {dietPlans.length > 0 ? (
              dietPlans.map((plan) => (
                <tr
                  className="transition-all border-b border-gray-700 hover:bg-[#18181b]"
                  key={plan._id}
                >
                  <td className="py-4 px-4 font-bold">{plan.day}</td>
                  <td className="py-4 px-4 capitalize">{plan.type}</td>
                  <td className="py-4 px-4">{plan.category}</td>
                  {mealNames.map((meal) => {
                    const m = plan[meal.key];
                    return (
                      <td key={meal.key} className="py-4 px-4 min-w-[180px]">
                        {m ? (
                          <div className="flex flex-col items-center">
                            {m.image && (
                              <Image
                                src={m.image}
                                alt={m.name}
                                width={60}
                                height={60}
                                className="rounded shadow mb-1"
                              />
                            )}
                            <div className="font-semibold">{m.name}</div>
                            <div className="text-xs text-gray-400">
                              {m.description}
                            </div>
                            <div className="text-xs mt-1 flex flex-wrap gap-2 justify-center">
                              <span className="bg-yellow-900/30 px-2 py-0.5 rounded">
                                P: {m.protein}g
                              </span>
                              <span className="bg-yellow-900/30 px-2 py-0.5 rounded">
                                C: {m.carbs}g
                              </span>
                              <span className="bg-yellow-900/30 px-2 py-0.5 rounded">
                                F: {m.fats}g
                              </span>
                              <span className="bg-yellow-900/30 px-2 py-0.5 rounded">
                                Cal: {m.calories}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="py-4 px-4">
                    <button
                      className="btn-primary !bg-red-500 hover:!bg-red-600 text-white px-3 py-1 rounded shadow"
                      onClick={() => handleDelete(plan._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-gray-400">
                  No diet plans found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-xl p-8 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-3 text-2xl font-bold text-gray-500 hover:text-red-500"
              onClick={() => setShowAddModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <AddDietPlanForm
              onSuccess={() => {
                setShowAddModal(false);
                getDietPlans();
              }}
              setShowAddModal={setShowAddModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
