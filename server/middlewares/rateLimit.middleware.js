import { rateLimit } from 'express-rate-limit';

export const generalLimiter = rateLimit({
    windowMs: 60 * 1000, 
	limit: 60, 
    message: 'Too many requests, try again later',
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
});

export const authLimiter = rateLimit({
	windowMs: 60 * 1000, 
	limit: 10, 
    message: 'Too many authentication requests, try again later',
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
});

export const modifyLimiter = rateLimit({
	windowMs: 60 * 1000, 
	limit: 20, 
    message: 'Too many modification requests, try again later',
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
});

export const createLimiter = rateLimit({
	windowMs: 60 * 1000, 
	limit: 30, 
    message: 'Too many creation requests, try again later',
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
});