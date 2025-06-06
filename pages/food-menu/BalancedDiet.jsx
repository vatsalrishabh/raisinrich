import React from 'react'
import NonVegSection from './NonVegSection'
import VegSection from './VegSection'
import Title from '../../components/ui/Title'
import axios from 'axios'

const BalancedDiet = ({ vegFoodItems, nonVegFoodItems }) => {
  return (
    <div id='balanced-diet'>
      <Title addClass="text-5xl font-extrabold text-center mb-12">#Balanced Diet</Title>
      <NonVegSection heading="Non-Veg" foodItems={nonVegFoodItems} />
      <VegSection heading="Veg" foodItems={vegFoodItems} />
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getAllFoodItems`)
    const foodItems = response.data || []
    return {
      props: {
        vegFoodItems: foodItems.filter(item => item.isVeg),
        nonVegFoodItems: foodItems.filter(item => !item.isVeg),
      }
    }
  } catch (error) {
    return {
      props: {
        vegFoodItems: [],
        nonVegFoodItems: [],
      }
    }
  }
}

export default BalancedDiet
