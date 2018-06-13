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
        const model: Model<IClasification> = new ClasificationModel({ name: req.body.name, createdAt: Date() });
        await model.save();
        const clasification: Model<IClasification> = await ClasificationModel.findOne({}, {}, { sort: { createdAt: -1 } });
        res.json(clasification);
    }

    async update(req: Request, res: Response): Promise<void> {
        await ClasificationModel.findByIdAndUpdate({ _id: req.body.id }, { name: req.body.name });
        const clasification: Model<IClasification> = await ClasificationModel.findById(req.body._id);
        res.json(clasification);
    }

    async delete(req: Request, res: Response): Promise<void> {
        const clasification: Model<IClasification> = await ClasificationModel.findByIdAndRemove(req.body.id);
        await CategoryModel.deleteMany({ clasificationId: clasification.id });
        res.status(200).json({ message: "Clasification(s) deleted and its dependencies" });
    }
}