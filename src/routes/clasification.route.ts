import * as express from "express";
import { Clasification } from "../controllers/clasification.controller";

const clasificationRoutes: express.Route = express.Router();
let controller: Clasification = new Clasification();
clasificationRoutes.route("/")
    .get((req: express.Request, res: express.Response, next: express.Next) => controller.getAll(req, res).catch(next))
    .post((req: express.Request, res: express.Response, next: express.Next) => controller.create(req, res).catch(next))
    .put((req: express.Request, res: express.Response, next: express.Next) => controller.update(req, res).catch(next))
    .delete((req: express.Request, res: express.Response, next: express.Next) => controller.delete(req, res).catch(next));

export default clasificationRoutes;