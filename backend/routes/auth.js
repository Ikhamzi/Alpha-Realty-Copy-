import express from 'express';
import User from '../models/User.js';
import Partner from '../models/Partner.js';
import jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Referral Login - User model only
router.post('/referral-login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        if (user.role !== 'referral') {
            return res.status(400).json({ message: 'Use partner login for partners' });
        }

        const token = jwt.sign({ id: user._id, role: user.role, model: 'User' }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({
            token,
            role: user.role,
            user: { id: user._id, name: user.name, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Partner Login - Partner model
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

// Signup
router.post('/signup', async (req, res) => {
    try {
        console.log('Signup request body:', req.body);

        const { name, email, password, role, agencyName, licenseNo } = req.body;

        if (role === 'referral') {
            // Check User exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const user = new User({ name, email, password, role: 'referral' });
            await user.save();
            const token = jwt.sign({ id: user._id, role: 'referral', model: 'User' }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.status(201).json({
                token,
                role: 'referral',
                user: { id: user._id, name: user.name, role: 'referral' }
            });
        } else if (role === 'partner') {
            // Check Partner exists
            const existingPartner = await Partner.findOne({ email });
            if (existingPartner) {
                return res.status(400).json({ message: 'Partner already exists' });
            }
            const partner = new Partner({ name, email, password, agencyName, licenseNo });
            await partner.save();
            const token = jwt.sign({ id: partner._id, role: 'partner', model: 'Partner' }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.status(201).json({
                token,
                role: 'partner',
                user: { id: partner._id, name: partner.name, role: 'partner' }
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

