import * as express from "express";
import * as mongoose from "mongoose";
import { IEvent } from "../interfaces/event.interface";
import { EventModel } from "../schemas/event.schema";

export class Event {

    async create(req: express.Request, res: express.Response): Promise<void> {

        const model: mongoose.Model<IEvent> = new EventModel({ title: "Prueba 1", start: new Date(), end: new Date() });
        await model.save((err: any) => {
            if (err) {
                res.send(err);
            }
        });
        const event:mongoose.Model<IEvent> = await EventModel.findOne((err) => {
            if (err) {
                res.send(err);
            }
        });
        res.json(event);
    }
}