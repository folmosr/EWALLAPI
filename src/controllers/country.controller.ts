import { Request, Response } from "express";
import { Model } from "mongoose";
import { ICountry } from "../interfaces/country.interface";
import { CountryModel } from "../schemas/country.schema";

export class Country {

    async getAll(req: Request, res: Response): Promise<void> {
        const countries: Model<ICountry> = await CountryModel.find();
        res.json(countries);
    }

    async create(req: Request, res: Response): Promise<void> {
        const model: Model<ICountry> = new CountryModel({
            name: req.body.name,
            code: req.body.code,
            createdAt: Date(),
            currency: req.body.currency
        });
        await model.save();
        const country: Model<ICountry> = await CountryModel.findOne({}, {}, { sort: { createdAt: -1 } });
        res.json(country);
    }

    async update(req: Request, res: Response): Promise<any> {
        await CountryModel.findByIdAndUpdate({ _id: req.body.id },
            {
                name: req.body.name,
                code: req.body.code,
                currency: req.body.currency
            });
        const category: Model<ICountry> = await CountryModel.findById(req.body.id);
        res.json(category);
    }

    async delete(req: Request, res: Response): Promise<void> {
        const category: Model<ICountry> = await CountryModel.findByIdAndRemove(req.body.id);
        await CountryModel.deleteMany({ parentId: category.id });
        res.status(200).json({ message: "Countr(y/ies) deleted" });
    }
}