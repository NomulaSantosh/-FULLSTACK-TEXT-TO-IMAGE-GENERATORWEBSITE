import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    creditBalance: { type: Number, default: 5 },
})

// if the user model already it will the user model if not it will create the model "mongoose.model("user", userSchema)"
const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel;