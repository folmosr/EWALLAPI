import { Schema } from "mongoose";
export interface IOrganization {
    name: String;
    url: String;
    logo: Object;
    createAt: Date;
}