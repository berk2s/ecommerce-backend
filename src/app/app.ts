import express from "express";
import { Routes } from "./routes/Routes";
import bodyParser = require("body-parser");
import { tokenMiddleware } from "./middlewares/token-middleware";
import { TokenUtility } from "./utilities/TokenUtility";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { errorHandler, notFound } from "./middlewares/error-middleware";

/**
 * @description This is a config for swagger
 */
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "Rocket TEAM API",
      description: "Rocket TEAM API 🚀🚀🚀",
      contact: {
        name: "Rocket TEAM",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "NodeJS Backend",
        },
      ],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
    // Global security definitions
    // security: [
    //   {
    //     bearerAuth: [],
    //   },
    // ],
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

    this.app.use(notFound);
    this.app.use(errorHandler);
  }
}
export default new App().app;
