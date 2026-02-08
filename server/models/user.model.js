import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'user model: name is required'],
            maxLength: 50,
            trim: true
        },
        email: {
            type: String,
            required: [true, 'user model: email is required'],
            unique: true,
            maxLength: 50,
            trim: true, 
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'user model: password is required'],
            maxLength: 100
        }
    },
    {timestamps: true}
)

const User = mongoose.model('User', userSchema);
export default User;
