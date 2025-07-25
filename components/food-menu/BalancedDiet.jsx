import React from 'react';
import NonVegSection from './NonVegSection';
import VegSection from './VegSection';
import Title from '../ui/Title';

const BalancedDiet = ({ plans }) => {
  console.log(plans);
  // Filter plans based on Veg or Non-Veg category
  const vegFoodItems = plans.filter(plan => plan.category === 'Veg');
  const nonVegFoodItems = plans.filter(plan => plan.category === 'Non-Veg');

  return (
    <div id="balanced-diet">
      <Title addClass="text-5xl font-extrabold text-center mb-12">#Balanced Diet</Title>

      <NonVegSection heading="Non-Veg" foodItems={nonVegFoodItems} />
      <VegSection heading="Veg" foodItems={vegFoodItems} />
    </div>
  );
};

export default BalancedDiet;
