import { rateLimit } from 'express-rate-limit';

export const generalLimiter = rateLimit({
    windowMs: 60 * 1000, 
	limit: 60, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
    handler: (req, res) => {
        res.status(429).json({
        success: false,
        message: 'Too many requests, try again later'
        });
    }
});

export const authLimiter = rateLimit({
	windowMs: 60 * 1000, 
	limit: 10, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56,
    handler: (req, res) => {
        res.status(429).json({
        success: false,
        message: 'Too many authentication requests, try again later'
        });
    } 
});

export const modifyLimiter = rateLimit({
	windowMs: 60 * 1000, 
	limit: 20, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56,
    handler: (req, res) => {
        res.status(429).json({
        success: false,
        message: 'Too many modification requests, try again later'
        });
    } 
});

export const createLimiter = rateLimit({
	windowMs: 60 * 1000, 
	limit: 30, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56,
    handler: (req, res) => {
        res.status(429).json({
        success: false,
        message: 'Too many creation requests, try again later'
        });
    } 
});