import * as express from "express";
import * as mongoose from "mongoose";
import { IClasification } from "../interfaces/clasification.interface";
import { ClasificationModel } from "../schemas/clasification.schema";
import { ICategory } from "../interfaces/category.interface";
import { CategoryModel } from "../schemas/category.schema";

export class Category {

    async getAll(req: express.Request, res: express.Response): Promise<any> {
        const categories: mongoose.Model<ICategory> = await CategoryModel.find();
        res.json(categories);
    }

    async create(req: express.Request, res: express.Response): Promise<any> {
        const clasification: mongoose.Model<IClasification> = await ClasificationModel.findById(req.body.clasificationId);
        if (clasification === null) {
            throw new Error("the category need to have a classification id");
        }
        const parent: mongoose.Model<ICategory> = await CategoryModel.findById(req.body.parentId);
        const model: mongoose.Model<ICategory> = new CategoryModel({
            name: req.body.name,
            clasificationId: clasification._id,
            created_at: Date(),
            parentId: (parent !== null) ? parent._id : null
        });
        await model.save();
        const category: mongoose.Model<ICategory> = await CategoryModel.findOne({}, {}, { sort: { created_at: -1 } });
        res.json(category);
    }

    async update(req: express.Request, res: express.Response): Promise<any> {
        await CategoryModel.findByIdAndUpdate({ _id: req.body._id }, { name: req.body.name });
        const category: mongoose.Model<ICategory> = await CategoryModel.findById(req.body._id);
        res.json(category);
    }

    async delete(req: express.Request, res: express.Response): Promise<void> {
        const category: mongoose.Model<ICategory> = await CategoryModel.findByIdAndRemove(req.body.id);
        await CategoryModel.deleteMany({ parentId: category.id });
        res.status(200).json({ message: "Categor(y/ies) deleted" });
    }
}