import { Request, Response } from "express";
import { Model } from "mongoose";
import { IClasification } from "../interfaces/clasification.interface";
import { ClasificationModel } from "../schemas/clasification.schema";
import { CategoryModel } from "../schemas/category.schema";

export class Clasification {

    async getAll(req: Request, res: Response): Promise<void> {
        const clasification: [Model<IClasification>] = await ClasificationModel.find();
        res.json(clasification);
    }

    async create(req: Request, res: Response): Promise<void> {
        let data: Buffer = new Buffer(req.body.imageBase64Encode, "base64");
        let contentType: String = "image/jpeg";
        const model: Model<IClasification> = new ClasificationModel({
            name: req.body.name,
            logo: { data, contentType },
            createdAt: Date()
        });
        await model.save();
        const clasification: Model<IClasification> = await ClasificationModel.findOne({}, {}, { sort: { createdAt: -1 } });
        res.json(clasification);
    }

    async update(req: Request, res: Response): Promise<void> {
        let data: Buffer = new Buffer(req.body.imageBase64Encode, "base64");
        let contentType: String = "image/jpeg";
        await ClasificationModel.findByIdAndUpdate({ _id: req.body._id }, {
            name: req.body.name,
            logo: { data, contentType },
            _id: req.body._id
        });
        const clasification: Model<IClasification> = await ClasificationModel.findById(req.body._id);
        res.json(clasification);
    }

    async delete(req: Request, res: Response): Promise<void> {
        const clasification: Model<IClasification> = await ClasificationModel.findByIdAndRemove({ _id: req.params.id }, (err) => {
            if (!err) {
                res.status(200).json({ message: "Countr(y/ies) deleted" });
            }
        });
    }
}