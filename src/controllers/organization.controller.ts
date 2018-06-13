import { Request, Response } from "express";
import { Model } from "mongoose";
import { IOrganization } from "../interfaces/organization.interface";
import { OrganizationModel } from "../schemas/organization.schema";

export class Organization {

    async create(req: Request, res: Response): Promise<void> {
        let data: Buffer = new Buffer(req.body.imageBase64Encode, "base64");
        let contentType: String = "image/jpeg";
        const model: Model<IOrganization> = new OrganizationModel({
            name: req.body.name,
            url: req.body.url,
            createdAt: Date(),
            logo: { data, contentType }
        });
        await model.save();
        const organization: Model<IOrganization> = await OrganizationModel.findOne({}, {}, { sort: { createdAt: -1 } });
        res.json(organization);
    }
}