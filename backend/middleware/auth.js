import jwt from 'jsonwebtoken';
import Referral from '../models/Referral.js';
import Partner from '../models/Partner.js';

export const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        let userDoc;
        if (decoded.model === 'Partner') {
            userDoc = await Partner.findById(decoded.id).select('-password');
        } else if (decoded.model === 'Referral') {
            userDoc = await Referral.findById(decoded.id).select('-password');
        }
        if (!userDoc) return res.status(401).json({ message: 'Token is not valid' });

        req.user = {
            id: userDoc._id,
            name: userDoc.name,
            role: decoded.role || 'referral',
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
