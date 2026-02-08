import { registerSchema } from "../schemas/auth.schema.js"
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'

export const register = async (req, res, next) => {
    try {
        registerSchema.parse(req.body);
        const { name, email, password } = req.body;

        const existingEmail = await User.findOne({ email });
        if(existingEmail) {
            const error = new Error('Email adress already exists')
            error.statusCode = 409;
            throw error;
        }

        // Hash Password
        const hash = await bcrypt.hash(password, 10);
        
        // Save to DB
        const user = await User.create({name, email, password: hash});

        // generate JWT
        const token = await jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
        
        res.cookie("token", token, {
            httpOnly: true,                 
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "strict",              
            maxAge: 24 * 60 * 60 * 1000      
        });

        return res.status(201).json({
            success: true,
            message: 'User Created Successfully'
        })
    } catch (error) {
        next(error)
    }
}