import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  cities: [{
    name: String,
    country: String,
    lat: Number,
    lon: Number,
    isFavorite: { type: Boolean, default: false },
    addedAt: { type: Date, default: Date.now }
  }],
  alertPreferences: {
    enabled: { type: Boolean, default: true },
    tempMin: { type: Number, default: 0 },
    tempMax: { type: Number, default: 35 },
    humidityThreshold: { type: Number, default: 80 },
    windThreshold: { type: Number, default: 50 },
    notifications: {
      inApp: { type: Boolean, default: true },
      email: { type: Boolean, default: false }
    }
  },
  notifications: [{
    type: { type: String, enum: ['weather', 'alert'] },
    title: String,
    message: String,
    city: String,
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);