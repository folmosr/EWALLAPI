import { Reques, Response, Next, Router, Route } from "express";
import { Country } from "../controllers/country.controller";

const countryRoutes: Route = Router();
let controller: Country = new Country();
countryRoutes.route("/")
    .get((req: Request, res: Response, next: Next) => controller.getAll(req, res).catch(next))
    .post((req: Request, res: Response, next: Next) => controller.create(req, res).catch(next))
    .put((req: Request, res: Response, next: Next) => controller.update(req, res).catch(next));

countryRoutes.route("/:code").get((req: Request, res: Response, next: Next) => controller.getByCode(req, res).catch(next));
countryRoutes.route("/:id").delete((req: Request, res: Response, next: Next) => controller.delete(req, res).catch(next));
export default countryRoutes;