import * as express from 'express'
import * as mongoose from 'mongoose';
import { EventModel } from '../schemas/event'

export class Event {

    async create(req: express.Request, res: express.Response) {

        const u = new EventModel({ title: 'Prueba 1', start: new Date(), end: new Date() });
        await u.save(function (err) {
            if (err) {
                res.send(err);
            }
        });
        const event = await EventModel.findOne(function (err) {
            if (err) {
                res.send(err);
            }
        });
        res.json(event);
    }
}