import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Partner from '../models/Partner.js';

export const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        let userDoc;
        if (decoded.model === 'Partner') {
            userDoc = await Partner.findById(decoded.id).select('-password');
        } else {
            userDoc = await User.findById(decoded.id).select('-password');
        }
        if (!userDoc) return res.status(401).json({ message: 'Token is not valid' });

        req.user = {
            id: userDoc._id,
            name: userDoc.name,
            role: userDoc.role || 'partner', // Partner doesn't have role field, default 'partner'
            email: userDoc.email
        };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export const roleAuth = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

