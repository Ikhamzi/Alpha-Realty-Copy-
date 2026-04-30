import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const referralSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    buyerName: { type: String },
    buyerPhone: { type: String },
    buyerEmail: { type: String },
    propertyInterest: { type: String },
    budget: { type: Number },
    location: { type: String },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'site-visit', 'negotiation', 'closed', 'cancelled'],
        default: 'pending'
    },
    rewardTier: { type: String, default: 'level1' }
}, {
    timestamps: true
});

// Hash password before saving
referralSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

referralSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('Referral', referralSchema);

