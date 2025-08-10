import React from 'react';
import NonVegSection from './NonVegSection';
import VegSection from './VegSection';
import Title from '../ui/Title';

const KetoDiet = ({ plans }) => {
   console.log(plans);
  // Filter only keto plans
  const ketoPlans = plans.filter(plan => plan.type.toLowerCase() === 'keto');

  // Further divide into veg and non-veg
  const vegFoodItems = ketoPlans.filter(plan => plan.category === 'Veg');
  const nonVegFoodItems = ketoPlans.filter(plan => plan.category === 'Non-Veg');

  return (
    <div id="keto-diet">
      <Title addClass="text-5xl font-extrabold text-center mb-12">#Keto Diet</Title>
      <NonVegSection heading="Non-Veg" foodItems={nonVegFoodItems} />
      <VegSection heading="Veg" foodItems={vegFoodItems} />
    </div>
  );
};

export default KetoDiet;
