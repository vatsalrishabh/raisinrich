import mongoose from 'mongoose';

const ptPaymentSchema = new mongoose.Schema({
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
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  packageName: {
    type: String,
    enum: ['Personal Training', 'Diet Plan'],
    required: true
  },
  packageDuration: {
    type: String,
    enum: ['1 Month', '3 Months', '6 Months'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    street: { 
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    }
  },
  bodyDetails: {
    height: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    sex: {
      type: String
    },
    activityLevel: {
      type: String,
      enum: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extra Active'],
      required: true
    }
  }
}, { timestamps: true });

export default mongoose.models.PTPayment || mongoose.model('PTPayment', ptPaymentSchema);