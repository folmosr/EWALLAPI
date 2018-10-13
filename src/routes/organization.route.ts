import { Reques, Response, Next, Router, Route } from "express";
import { Organization } from "../controllers/organization.controller";

const organizationRoutes: Route = Router();
let controller: Organization = new Organization();
organizationRoutes.route("/")
    .get((req: Request, res: Response, next: Next) => controller.getAll(req, res).catch(next))
    .post((req: Request, res: Response, next: Next) => controller.create(req, res).catch(next))
    .put((req: Request, res: Response, next: Next) => controller.update(req, res).catch(next));
organizationRoutes.route("/:documents").delete((req: Request, res: Response, next: Next) => controller.delete(req, res).catch(next));
export default organizationRoutes;