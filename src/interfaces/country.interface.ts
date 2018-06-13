import { Schema } from "mongoose";
export interface ICountry {
    name:String;
    currency:String;
    code:String;
    createdAt: Date;
}
