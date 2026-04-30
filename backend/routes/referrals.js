import express from 'express';
import Referral from '../models/Referral.js';
import { auth, roleAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(auth, roleAuth(['referral']));

// Create referral
router.post('/', async (req, res) => {
    try {
        const referral = new Referral({ ...req.body, userId: req.user._id });
        await referral.save();
        res.status(201).json(referral);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user referrals
router.get('/', async (req, res) => {
    try {
        const referrals = await Referral.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(referrals);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update referral status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const referral = await Referral.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { status },
            { new: true }
        );
        if (!referral) {
            return res.status(404).json({ message: 'Referral not found' });
        }
        res.json(referral);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

