"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import React from 'react';
import CircularTitleBar from '../../components/CircularTitleBar';
import subscriptionImage from '../../public/images/subscription.png';
import JumpToBalKetoDetox from '../../components/food-menu/JumpToBalKetoDetox';
import BalancedDiet from '../../components/food-menu/BalancedDiet';
import KetoDiet from '../../components/food-menu/KetoDiet';
import DetoxDiet from '../../components/food-menu/DetoxDiet';

const Index = () => {
  const [dietPlans, setDietPlans] = useState([]);

  useEffect(() => {
    const getDietPlans = async () => {
      try {
        const res = await axios.get("/api/dietplans");
        setDietPlans(res.data.dietPlans);
        console.log(res.data.dietPlans);
        if (res.data.dietPlans.length === 0) {
          toast.info("No diet plans available at the moment.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch diet plans");
      }
    };

    getDietPlans();
  }, []);

  // 🔍 Filter by type (case-insensitive)
  const normalize = (v) => (v || "").toString().trim().toLowerCase();
  const balancedPlans = dietPlans.filter(plan => normalize(plan.type) === "balanced");
  const ketoPlans = dietPlans.filter(plan => normalize(plan.type) === "keto");
  const detoxPlans = dietPlans.filter(plan => normalize(plan.type) === "detox");

  return (
    <div>
      <CircularTitleBar title="" subtitle="#SAMPLE FOOD MENU" image={subscriptionImage} />
      <JumpToBalKetoDetox />

      {/* 👇 Pass filtered data into each component */}
      <BalancedDiet plans={balancedPlans} />
      <KetoDiet plans={ketoPlans} />
      <DetoxDiet plans={detoxPlans} />
    </div>
  );
};

export default Index;
