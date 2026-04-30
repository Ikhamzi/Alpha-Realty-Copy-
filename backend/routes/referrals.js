import express from 'express';
import ReferralLead from '../models/ReferralLead.js';
import { auth, roleAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(auth, roleAuth(['referral']));

// Create referral lead for the authenticated referral user
router.post('/', async (req, res) => {
    try {
        const lead = new ReferralLead({ ...req.body, referralId: req.user.id });
        await lead.save();
        res.status(201).json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get logged in referral user's leads
router.get('/', async (req, res) => {
    try {
        const leads = await ReferralLead.find({ referralId: req.user.id }).sort({ createdAt: -1 });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update referral lead status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const lead = await ReferralLead.findOneAndUpdate(
            { _id: req.params.id, referralId: req.user.id },
            { status },
            { new: true }
        );
        if (!lead) {
            return res.status(404).json({ message: 'Referral lead not found' });
        }
        res.json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
