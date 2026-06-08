import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'

const authenticate = async (req, res, next) => {
    try {
        const authHeaders = req.headers['authorization'] || req.headers['Authorization'];
        if (!authHeaders) return res.status(401).json({success: false, msg: 'Unauthorized, auth headers not found'});

        if(!authHeaders.startsWith('Bearer ')) return res.status(401).json({success: false, msg: 'malformed auth header'})

        const token = authHeaders.split(' ')[1];
        if (!token) return res.status(401).json({success: false, msg: 'Unauthorized, access token not found'});

        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(payload.userId).select("-password");
        if(!user) return res.status(404).json({success: false, msg: 'User not found'});

        req.user = user;
        
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            msg: "Invalid or expired token"
        });
    }
}

export default authenticate;