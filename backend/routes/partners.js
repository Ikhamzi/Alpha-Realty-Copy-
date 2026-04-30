import express from 'express';
import { auth, roleAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(auth, roleAuth(['partner']));

// Get partner dashboard data
router.get('/dashboard', async (req, res) => {
    // Mock data - replace with real queries later
    res.json({
        stats: {
            totalSales: 245000,
            commissionRate: 3.2,
            infinityLeads: 127,
            conversionRate: 89
        },
        recentActivity: [
            { id: 1, type: 'sale', description: 'Villa sold - ₹2.5Cr', time: '2h ago' },
            { id: 2, type: 'visit', description: 'Site visit scheduled', time: '1 day ago' },
            { id: 3, type: 'lead', description: 'New lead converted', time: '3 days ago' }
        ]
    });
});

// Get inventory
router.get('/inventory', async (req, res) => {
    res.json([
        { id: 1, name: 'Luxury Villa A', price: '₹2.5Cr', location: 'Bangalore', type: 'villa' },
        { id: 2, name: 'Penthouse B', price: '₹1.8Cr', location: 'Mumbai', type: 'apartment' },
        { id: 3, name: 'Plot C', price: '₹80L', location: 'Hyderabad', type: 'plot' }
    ]);
});

export default router;

