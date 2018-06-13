import { Request, Response } from "express";
import { Model } from "mongoose";
import { IClasification } from "../interfaces/clasification.interface";
import { ClasificationModel } from "../schemas/clasification.schema";
import { ICategory } from "../interfaces/category.interface";
import { CategoryModel } from "../schemas/category.schema";

export class Category {

    async getAll(req: Request, res: Response): Promise<any> {
        const categories: Model<ICategory> = await CategoryModel.find();
        res.json(categories);
    }

    async create(req: Request, res: Response): Promise<any> {
        const clasification: Model<IClasification> = await ClasificationModel.findById(req.body.clasificationId);
        if (clasification === null) {
            throw new Error("the category need to have a classification id");
        }
        const parent: Model<ICategory> = await CategoryModel.findById(req.body.parentId);
        const model: Model<ICategory> = new CategoryModel({
            name: req.body.name,
            clasificationId: clasification._id,
            createdAt: Date(),
            parentId: (parent !== null) ? parent._id : null
        });
        await model.save();
        const category: Model<ICategory> = await CategoryModel.findOne({}, {}, { sort: { createdAt: -1 } });
        res.json(category);
    }

    async update(req: Request, res: Response): Promise<any> {
        await CategoryModel.findByIdAndUpdate({ _id: req.body.id }, { name: req.body.name });
        const category: Model<ICategory> = await CategoryModel.findById(req.body.id);
        res.json(category);
    }

    async delete(req: Request, res: Response): Promise<void> {
        const category: Model<ICategory> = await CategoryModel.findByIdAndRemove(req.body.id);
        await CategoryModel.deleteMany({ parentId: category.id });
        res.status(200).json({ message: "Categor(y/ies) deleted" });
    }
}