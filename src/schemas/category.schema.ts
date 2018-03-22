import { Document, Schema, Model, model } from "mongoose";
import { ICategory } from "../interfaces/category.interface";

export const CategorytSchema: Schema = new Schema({
    name: { type: String, required: true },
    clasificationId: { type: Schema.Types.ObjectId, required: true },
    parentId:Schema.Types.ObjectId,
    created_at: Date
});

export const CategoryModel: Model<ICategory> = model<ICategory>("categories", CategorytSchema);