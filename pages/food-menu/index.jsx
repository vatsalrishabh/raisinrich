"use client";
import { useEffect, useState } from 'react';
import api from '../../util/axios';
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
        const res = await api.get("/api/dietplans");
        const plans = res.data || [];
        setDietPlans(plans);
        console.log('Diet plans received:', plans);
        if (plans.length > 0) {
          console.log('First diet plan structure:', JSON.stringify(plans[0], null, 2));
          console.log('First diet plan breakfast image:', plans[0].breakfast?.image);
        }
        if (plans.length === 0) {
          toast.info("No diet plans available at the moment.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch diet plans");
        setDietPlans([]); // Set empty array on error
      }
    };

    getDietPlans();
  }, []);

  // 🔍 Filter by type with proper validation
  const balancedPlans = Array.isArray(dietPlans) ? dietPlans.filter(plan => plan.type === "balanced") : [];
  const ketoPlans = Array.isArray(dietPlans) ? dietPlans.filter(plan => plan.type === "keto") : [];
  const detoxPlans = Array.isArray(dietPlans) ? dietPlans.filter(plan => plan.type === "detox") : [];

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
