import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
/**
 * Routes
 */
import clasificationRoute from "./routes/clasification.route";
import categoryRoute from "./routes/category.route";
import eventRoute from "./routes/event.route";
/**
 * Config
 */
import env from "./config/env";

export class Api {
  /**
   * private fields
   */
  private router: express.Router;
  /**
   * @param app - express application
   */
  constructor(private app: express.Express) {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.router = express.Router();
    this.configureRoutes();
  }

  private errorHandling(error: express.Error, req: express.Request, res: express.Response, next: express.Next): void {
    res.status(error.status || env.ERRORCODE);
    res.json({
      error: {
        message: error.message
      }
    });
  }
  /**
   * routes configuration
   */
  private configureRoutes(): void {
    this.router.get("/", (req: express.Request,
      response: express.Response) => {
      response.send("welcome to events api!");
    }
    );
    this.router.use("/events", eventRoute);
    this.router.use("/categories", categoryRoute);
    this.router.use("/clasifications", clasificationRoute);
    this.router.use((error: express.Error,
      req: express.Request,
      res: express.Response,
      next: express.Next) => this.errorHandling(error, req, res, next));
    this.app.use("/api", this.router);
  }

  private connectDb(): void {
    mongoose.connect(`mongodb://${env.DBHOST}:${env.DBPORT}/${env.DBNAME}`, (err: any, res: any) => {
      if (err) {
        console.log("ERROR: connecting to Database." + err);
        process.exit(1);
      }
      console.log(`===>  ⚙️ Database listening on mongodb://${env.DBHOST}:${env.DBPORT}/${env.DBNAME}`);
    });
  }

  /**
   * start point app
   */
  public run(): void {

    let httpServer: any = this.app.listen(env.PORT, (error: any) => {
      if (error) {
        console.error(error);
      } else {
        this.connectDb();
        const address: any = httpServer.address();
        console.log(`==> 🌎 Listening on ${address.port}. Open up http://localhost:${address.port}/ in your browser.`);
      }
    });
  }
}