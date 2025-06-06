import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User'
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
  razorpaySignature: {
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
    enum: ['created', 'paid', 'failed'],
    default: 'created'
  },
  planDetails: {
    goal: {
      type: String,
      enum: ['Weight Loss', 'Weight Maintenance', 'Gain Muscle', 'Detox Cut Diet']
    },
    subscriptionDuration: {
      type: String,
      enum: ['3 Days Trial', '2 Weeks', '4 Weeks']
    },
    mealsPerDay: [String], // ["Breakfast", "Lunch", "Dinner"]
    preference: {
      type: String,
      enum: ['Veg', 'Non-Veg', 'Eggetarian']
    }
  },
  paymentDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
