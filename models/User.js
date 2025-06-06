import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: function () {
      return this.role === 'admin';
    },
    select: false, // hide from queries unless explicitly selected
  },

  name: {
    type: String,
    required: function () {
      return this.role !== 'admin';
    },
  },

  age: {
    type: Number,
    required: function () {
      return this.role !== 'admin';
    },
  },

  weight: {
    type: Number,
    required: function () {
      return this.role !== 'admin';
    },
  },

  height: {
    feet: {
      type: Number,
      required: function () {
        return this.role !== 'admin';
      },
    },
    inches: {
      type: Number,
      required: function () {
        return this.role !== 'admin';
      },
    },
  },

  sex: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: function () {
      return this.role !== 'admin';
    },
  },

  mobile: {
    type: String,
    required: function () {
      return this.role !== 'admin';
    },
  },

  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },

  foodDeliveryPlan: {
    goal: {
      type: String,
      enum: ['Weight Loss', 'Weight Maintenance', 'Gain Muscle', 'Detox Cut Diet'],
      required: function () {
        return this.role !== 'admin';
      },
    },
    subscriptionDuration: {
      type: String,
      enum: ['3 Days Trial', '2 Weeks', '4 Weeks'],
      required: function () {
        return this.role !== 'admin';
      },
    },
    mealsPerDay: {
      type: [String],
      enum: ['Breakfast', 'Lunch', 'Evening Snack', 'Dinner'],
      validate: {
        validator: function (val) {
          return this.role === 'admin' || (Array.isArray(val) && val.length > 0);
        },
        message: 'At least one meal must be selected',
      },
    },
    preference: {
      type: String,
      enum: ['Veg', 'Non-Veg', 'Eggetarian'],
      required: function () {
        return this.role !== 'admin';
      },
    },
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
