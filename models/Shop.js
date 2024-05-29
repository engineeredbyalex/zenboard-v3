import { Model, Schema, model,  } from "mongoose";

const storeSchema = new Schema({
    name: { type: String, unique: true, required: true },
    headerColor: { type: String, unique: true, required: true },
    headerText: { type: String, unique: true, required: true },
    mainColor: { type: String, unique: true, required: true },
    accentColor: { type: String, unique: true, required: true },
}, {
    timestamps:true
}
)

const StoreData = models?.StoreData || model("StoreData",storeSchema)