import { Document, Schema, Model, model } from "mongoose";
import { ICountry } from "../interfaces/country.interface";

export const CountrytSchema: Schema = new Schema({
    name: { type: String, required: true },
    currency: { type: String, required: true },
    code: { type: String, required: true },
    createdAt: Date
});

export const CountryModel: Model<ICountry> = model<ICountry>("countries", CountrytSchema);