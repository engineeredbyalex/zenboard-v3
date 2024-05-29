import { model, models, Schema } from "mongoose";

const AccountSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    name: String,
    email: String,
    profile: String,
    role: String,
});
export const Account = models?.Account || model('Account', AccountSchema);