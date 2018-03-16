import * as express from "express";
import { Clasification } from "../controllers/clasification.controller";

const clasificationRoutes: express.Route = express.Router();
let controller: Clasification = new Clasification();
clasificationRoutes.route("/")
    .get((req: express.Request, res: express.Response) => {
        controller.getAll(req, res);
    })
    .post((req: express.Request, res: express.Response, next: express.next) => {
        if ((req.body.name === "") || (req.body.name === undefined) || (req.body.name === null)) {
            res.status(404).end("not found");
        } else {
            next();
        }
    }, (req: express.Request, res: express.Response) => controller.create(req, res)
    ).put((req: express.Request, res: express.Response, next: express.next) => {
        if (((req.body.id === "") || (req.body.id === undefined) || (req.body.id === null))
            || ((req.body.name === "") || (req.body.name === undefined) || (req.body.name === null))) {
            res.status(404).end("not found");
        } else {
            next();
        }
    }, (req: express.Request, res: express.Response) => controller.update(req, res)
    ).delete((req: express.Request, res: express.Response, next: express.next) => {
        if ((req.body.id === "") || (req.body.id === undefined) || (req.body.id === null)) {
            res.status(404).end("not found");
        } else {
            next();
        }
    }, (req: express.Request, res: express.Response) => controller.delete(req, res)
    );

export default clasificationRoutes;