import * as express from "express";
import { Category } from "../controllers/category.controller";

const categoryRoutes: express.Route = express.Router();
let controller: Category = new Category();
categoryRoutes.route("/")
    .get((req: express.Request, res: express.Response, next:express.Next) => controller.getAll(req, res).catch(next))
    .post((req: express.Request, res: express.Response, next:express.Next) => controller.create(req, res).catch(next))
    .put((req: express.Request, res: express.Response, next:express.Next) => controller.update(req, res).catch(next))
    .delete((req: express.Request, res: express.Response, next:express.Next) => controller.delete(req, res).catch(next));
export default categoryRoutes;