import express from 'express';
import Referral from '../models/Referral.js';
import Partner from '../models/Partner.js';
import jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Referral Login - Using Referral model
router.post('/referral-login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const referral = await Referral.findOne({ email });
        if (!referral || !(await referral.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: referral._id, role: 'referral', model: 'Referral' }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({
            token,
            role: 'referral',
            user: { id: referral._id, name: referral.name, role: 'referral' }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Partner Login - Using Partner model
router.post('/partner-login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const partner = await Partner.findOne({ email });
        if (!partner || !(await partner.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: partner._id, role: 'partner', model: 'Partner' }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({
            token,
            role: 'partner',
            user: { id: partner._id, name: partner.name, role: 'partner' }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Signup - Creates in Referral or Partner model based on role
router.post('/signup', async (req, res) => {
    try {
        console.log('Signup request body:', req.body);

        const { name, email, password, role, agencyName, licenseNo } = req.body;

        if (role === 'referral') {
            const existingReferral = await Referral.findOne({ email });
            if (existingReferral) {
                return res.status(400).json({ message: 'Referral already exists' });
            }
            const referral = new Referral({ name, email, password });
            await referral.save();
            const token = jwt.sign({ id: referral._id, role: 'referral', model: 'Referral' }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.status(201).json({
                token,
                user: {
                    id: referral._id,
                    name: referral.name,
                    email: referral.email,
                    role: 'referral'
                }
            });
        } else if (role === 'partner') {
            if (!agencyName || !licenseNo) {
                return res.status(400).json({ message: 'Agency name and license number are required for partners' });
            }
            const existingPartner = await Partner.findOne({ email });
            if (existingPartner) {
                return res.status(400).json({ message: 'Partner already exists' });
            }
            const partner = new Partner({ name, email, password, agencyName, licenseNo });
            await partner.save();
            const token = jwt.sign({ id: partner._id, role: 'partner', model: 'Partner' }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.status(201).json({
                token,
                user: {
                    id: partner._id,
                    name: partner.name,
                    email: partner.email,
                    role: 'partner'
                }
            });
        } else {
            res.status(400).json({ message: 'Invalid role' });
        }
    } catch (error) {
        console.error('Signup error:', error.message);
        console.error('Full error stack:', error.stack);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get current user
router.get('/me', auth, async (req, res) => {
    res.json(req.user);
});

export default router;
