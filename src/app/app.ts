import express from "express";
import { Routes } from "./routes/Routes";
import bodyParser = require("body-parser");
import { tokenMiddleware } from "./middlewares/token-middleware";
import { TokenUtility } from "./utilities/TokenUtility";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Rocket TEAM API",
      description: "Rocket TEAM API Information",
      contact: {
        name: "Rocket TEAM",
      },
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["./src/app/routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

class App {
  public app: express.Application;
  public _routes: Routes;

  constructor() {
    // TokenUtility.initilaizePublicKey()

    this.app = express();

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this._routes = new Routes();
    this._routes.routes(this.app);

    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }
}
export default new App().app;
