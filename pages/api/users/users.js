// importing mongoose to connect 
import { mongooseConnect } from "@/lib/mongoose";
// importing user model
import { User } from "@/models/User";

export default async function handle(req, res) {
    await mongooseConnect();

    if (req.method === 'POST') {
        const { email, password } = req.body;
        if (await User.findOne({ email, password })) {
            res.status(400).json({ message: 'Account already exists !' });
        } else {
            res.json(await User.create({ email, password }));
        }
    }

    if (req.method === 'DELETE') {
        const { _id } = req.query;
        await User.findByIdAndDelete(_id);
        res.json(true);
    }
}