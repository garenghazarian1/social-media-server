import mongoose from "mongoose";

const {Schema} = mongoose;
const authSchema = new Schema({
    name: {type: String, required: true, trim: true},
    username: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true, trim: true},},
{timestamps: true });//creates createdAt and updatedAt fields

const Auth = mongoose.model('Auth', authSchema);

export default Auth;