import { Document, Schema, Model, model } from "mongoose";
import { IClasification } from "../interfaces/clasification.interface";

export const ClasificationSchema: Schema = new Schema({
    name: { type: String, required: true },
    logo: { data: Schema.Types.Buffer, contentType: String },
    createdAt: Date
});

export const ClasificationModel: Model<IClasification> = model<IClasification>("clasifications", ClasificationSchema);