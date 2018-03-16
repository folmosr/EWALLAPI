import * as express from "express";
import { Event } from "../controllers/event.controller";

let eventsRouter: express.Router = express.Router();
eventsRouter.route("/")
        .get((req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.json({ message: "event list" });
        })
        .post((req: express.Request, res: express.Response, next: express.NextFunction) => {
                let eventController: Event = new Event();
                eventController.create(req, res);
        });
export default eventsRouter;