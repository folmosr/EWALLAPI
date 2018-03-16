import * as express from "express";
import * as mongoose from "mongoose";
import { IClasification } from "../interfaces/clasification.interface";
import { ClasificationModel } from "../schemas/clasification.schema";

export class Clasification {

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        let clasification: [mongoose.Model<IClasification>] = await ClasificationModel.find((err) => {
            if (err) {
                res.status(500).send(err);
            }
        });
        res.json(clasification);
    }

    async create(req: express.Request, res: express.Response): Promise<void> {

        const model: mongoose.Model<IClasification> = new ClasificationModel({ name: req.body.name, created_at: Date() });
        await model.save((err: any) => {
            if (err) {
                res.status(500).send(err);
            }
        });
        const clasification: mongoose.Model<IClasification> = await ClasificationModel.findOne({}, {}, { sort: { created_at: -1 } },
            (err) => {
                if (err) {
                    res.status(500).send(err);
                }
            });
        res.json(clasification);
    }

    async update(req: express.Request, res: express.Response): Promise<void> {
        const clasification: mongoose.Model<IClasification> = await ClasificationModel.findByIdAndUpdate({ _id: req.body.id },
            { name: req.body.name },
            (err) => {
                if (err) {
                    res.status(500).send(err);
                }
            });
        res.json(clasification);
    }

    delete(req: express.Request, res: express.Response): void {
        let clasification: mongoose.Model<IClasification> = ClasificationModel.findByIdAndRemove(req.body.id,
            (err, _clasification) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.json({ message: `Clasification successfully deleted ${_clasification._id}` });
            });
    }
}