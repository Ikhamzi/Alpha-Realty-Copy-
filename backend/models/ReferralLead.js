import mongoose from 'mongoose';

const referralLeadSchema = new mongoose.Schema({
    referralId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Referral',
        required: true
    },
    buyerName: {
        type: String,
        required: true,
        trim: true
    },
    buyerPhone: {
        type: String,
        required: true,
        trim: true
    },
    buyerEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    propertyInterest: {
        type: String,
        trim: true
    },
    budget: {
        type: Number
    },
    location: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'site-visit', 'negotiation', 'closed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

export default mongoose.model('ReferralLead', referralLeadSchema);
