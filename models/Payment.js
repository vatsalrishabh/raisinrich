import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User'
    // not required
  },
  razorpayPaymentId: {
    type: String,
    required: true,
    unique: true
  },
  razorpayOrderId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  planDetails: {
    goal: {
      type: String,
      enum: ['Weight Loss', 'Weight Maintenance', 'Gain Muscle', 'Detox Cut Diet']
    },
    dietTechnique: {
      type: String,
    },
    dietType:String, // e.g., "Balanced", "Keto", "Detox"
    heightFeet: String, // in feet
    heightInches: String, // in inches
    weight: String, // in kg
    age: String, // in years
    gender:String,
    mealTimes: [String], // e.g., ["Breakfast", "Lunch", "Evening-Snack", "Dinner"]
    days:String, // e.g., "3 Days", "5 Days", "7 Days"
    fullName: String,
    email: String,
    phone: String,
    address:String,
    city:String,
    state:String,
    country:String,
    zipCode:String,
  },
  total: {
    type: String,
    required: true
  },

  
   
});

export default mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
