import express, {Application, Request, Response} from "express" ;
import { env } from "../src/config/env";
import { logRequest } from "./middleware/log.middleware";
import { bikeRoutes } from "./routes/bikes";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from "swagger-ui-express";

const PORT = env.port;
const app: Application = express();

app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
    message: "hello world, i am running on port 5050" 
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    });

    app.use((req, _res, next) => {  
        console.log(`${req.method} ${req.originalUrl}`);
        next();
    });
    
    app.use(express.json()); 
 app.use('/api/v1/cars', logRequest, bikeRoutes); //tell app to use the bikeRoutes for any requests that start with /bikes

    app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
    ); // serves swagger documentation at /api-docs

