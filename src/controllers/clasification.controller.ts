import * as express from "express";
import * as mongoose from "mongoose";
import { IClasification } from "../interfaces/clasification.interface";
import { ClasificationModel } from "../schemas/clasification.schema";
import { CategoryModel } from "../schemas/category.schema";

export class Clasification {

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        const clasification: [mongoose.Model<IClasification>] = await ClasificationModel.find();
        res.json(clasification);
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        const model: mongoose.Model<IClasification> = new ClasificationModel({ name: req.body.name, created_at: Date() });
        await model.save();
        const clasification: mongoose.Model<IClasification> = await ClasificationModel.findOne({}, {}, { sort: { created_at: -1 } });
        res.json(clasification);
    }

    async update(req: express.Request, res: express.Response): Promise<void> {
        await ClasificationModel.findByIdAndUpdate({ _id: req.body.id }, { name: req.body.name });
        const clasification: mongoose.Model<IClasification> = await ClasificationModel.findById(req.body._id);
        res.json(clasification);
    }

    async delete(req: express.Request, res: express.Response): Promise<void> {
        const clasification: mongoose.Model<IClasification> = await ClasificationModel.findByIdAndRemove(req.body.id);
        await CategoryModel.deleteMany({ clasificationId: clasification.id });
        res.status(200).json({ message: "Clasification(s) deleted and its dependencies" });
    }
}