import { loginSchema, registerSchema } from "../schemas/auth.schema.js"
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
    try {
        const validationResult = registerSchema.safeParse(req.body);

        if(!validationResult.success) {
            const err = new Error('register input validation failed');
            err.statusCode = 400;
            err.issues = validationResult.error.issues;
            throw err;
        }

        const { name, email, password } = validationResult.data;

        const normalizedEmail = email.toLowerCase().trim(); 

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            const error = new Error('Email address already exists');
            error.statusCode = 409;
            throw error;
        }

        // Hash Password
        const hash = await bcrypt.hash(password, 10);
        
        // Save to DB
        const user = await User.create({
                name: name.trim(),
                email: normalizedEmail,
                password: hash
            });

        // generate JWT
        const token = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
        
        const { password: _password, ...safeUser } = user.toObject();
        return res.status(201).json({
            success: true,
            message: 'User Created Successfully',
            accessToken: token,
            user: safeUser
        });
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const validationResult = loginSchema.safeParse(req.body);
        if (!validationResult.success) {
            const err = new Error('Login input validation failed');
            err.statusCode = 400;
            err.issues = validationResult.error.issues;
            throw err;
        }

        const { email, password } = validationResult.data;
        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            const error = new Error('User does not exist');
            error.statusCode = 401;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Invalid Password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

        const { password: _password, ...safeUser } = user.toObject();
        return res.status(200).json({
            success: true,
            message: 'Logged In Successfully',
            accessToken: token,
            user: safeUser
        });
    } catch (error) {
        next(error);
    }
};