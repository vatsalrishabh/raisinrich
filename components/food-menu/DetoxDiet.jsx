import React from 'react';
import NonVegSection from './NonVegSection';
import VegSection from './VegSection';
import Title from '../ui/Title';

const DetoxDiet = ({ plans }) => {
   console.log(plans);
  // Filter detox diet plans only
  const detoxPlans = plans.filter(plan => plan.type.toLowerCase() === 'detox');

  // Separate into veg and non-veg
  const vegFoodItems = detoxPlans.filter(plan => plan.category === 'Veg');
  const nonVegFoodItems = detoxPlans.filter(plan => plan.category === 'Non-Veg');

  return (
    <div id="detox-diet">
      <Title addClass="text-5xl font-extrabold text-center mb-12">#Detox Diet</Title>
      <NonVegSection heading="Non-Veg" foodItems={nonVegFoodItems} />
      <VegSection heading="Veg" foodItems={vegFoodItems} />
    </div>
  );
};

export default DetoxDiet;
