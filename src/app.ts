import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'
import env from './config/env';
import eventRouter from './routes/eventRouter'

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

  /** 
   * routes configuration 
  */
  private configureRoutes() {
    this.router.get('/', (req: express.Request,
      response: express.Response) => {
      response.send('welcome to events api!');
    }
    );
    this.router.use('/events', eventRouter);
    this.app.use('/api', this.router);
  }

  private connectDb() {
    mongoose.connect(`mongodb://${env.DBHOST}:${env.DBPORT}/${env.DBNAME}`, function (err: any, res: any) {
      if (err) {
        console.log('ERROR: connecting to Database. ' + err);
      }
      console.info(`===>  ⚙️ Database listening on mongodb://${env.DBHOST}:${env.DBPORT}/${env.DBNAME}`);
    });
  }

  /** 
   * start point app
  */
  public run() {

    let httpServer = this.app.listen(env.PORT, (error: any) => {
      if (error) {
        console.error(error);
      } else {
        this.connectDb();
        const address = httpServer.address();
        console.info(`==> 🌎 Listening on ${address.port}. Open up http://localhost:${address.port}/ in your browser.`);
      }
    });
  }
}