import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const partnerSchema = new mongoose.Schema({
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
    agencyName: {
        type: String,
        required: true,
        trim: true
    },
    licenseNo: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    commissionRate: {
        type: Number,
        default: 3.5,
        min: 0,
        max: 5
    }
}, {
    timestamps: true
});

// Hash password before saving
partnerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

partnerSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('Partner', partnerSchema);
