import * as express from 'express'
import {Event} from '../controllers/event'

let eventRouter = express.Router();
eventRouter.route('/')
        .get((req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.json({ message: 'events controller!' });
        })
        .post((req: express.Request, res: express.Response, next: express.NextFunction) => {
                let eventController = new Event();
                eventController.create(req, res); 
        });
export default eventRouter;