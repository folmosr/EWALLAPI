import { Document, Schema, Model, model } from "mongoose";
import { IOrganization } from "../interfaces/organization.interface";

export const OrganizationSchema: Schema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    logo: { data: Schema.Types.Buffer, contentType: String },
    createdAt: Date
});

export const OrganizationModel: Model<IOrganization> = model<IOrganization>("organizations", OrganizationSchema);