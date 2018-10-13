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

    async getAll(req: Request, res: Response): Promise<void> {
        const orgs: Model<IOrganization> = await OrganizationModel.find();
        res.json(orgs);
    }

    async update(req: Request, res: Response): Promise<any> {
        let data: Buffer = new Buffer(req.body.imageBase64Encode, "base64");
        let contentType: String = "image/jpeg";
        const model: Model<IOrganization> = new OrganizationModel({
            name: req.body.name,
            url: req.body.url,
            logo: { data, contentType },
            _id: req.body._id
        });
        await OrganizationModel.findByIdAndUpdate({ _id: model._id }, model);
        const organization: Model<IOrganization> = await OrganizationModel.findOne({}, {}, { sort: { createdAt: -1 } });
        res.json(organization);
    }

    async delete(req: Request, res: Response): Promise<void> {
        await OrganizationModel.deleteMany({ _id: { $in: req.params.documents.split(",") } }, (err) => {
            if (!err) {
                res.status(200).json({ message: "Organization(s) deleted" });
            }
        });
    }
}