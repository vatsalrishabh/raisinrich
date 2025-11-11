// Dynamic subscription pricing utility
// Calculates total based on diet type, selected meal times per day, and number of days

// Price table keyed by form labels and diet types
const PRICE_TABLE = {
  Vegetarian: {
    "Morning": 150, // Breakfast
    "Afternoon": 200, // Lunch
    "Evening Snack": 100, // Snack
    "Dinner": 150,
  },
  "Eggitarian": {
    "Morning": 200,
    "Afternoon": 250,
    "Evening Snack": 120,
    "Dinner": 250,
  },
  "Non-Vegetarian": {
    "Morning": 200,
    "Afternoon": 350,
    "Evening Snack": 120,
    "Dinner": 250,
  },
};

function parseDays(daysValue) {
  if (!daysValue) return 0;
  if (typeof daysValue === "number") return daysValue;
  const match = String(daysValue).match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function calculateSubscriptionTotal({ dietType, mealTimes, days }) {
  const daysCount = parseDays(days);
  if (!daysCount) return 0;

  const table = PRICE_TABLE[dietType] || PRICE_TABLE["Vegetarian"];
  const meals = Array.isArray(mealTimes) ? mealTimes : [];
  if (meals.length === 0) return 0;

  const perDayTotal = meals.reduce((sum, mealLabel) => {
    const price = table[mealLabel] || 0;
    return sum + price;
  }, 0);

  return perDayTotal * daysCount;
}

export { calculateSubscriptionTotal };