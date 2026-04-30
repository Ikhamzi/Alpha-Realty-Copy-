import mongoose from 'mongoose';

const referralSchema = new mongoose.Schema({
    buyerName: { type: String, required: true },
    buyerPhone: { type: String, required: true },
    buyerEmail: { type: String },
    propertyInterest: { type: String, required: true },
    budget: { type: Number },
    location: { type: String },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'site-visit', 'negotiation', 'closed', 'cancelled'],
        default: 'pending'
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rewardTier: { type: String, default: 'level1' }
}, {
    timestamps: true
});

export default mongoose.model('Referral', referralSchema);

