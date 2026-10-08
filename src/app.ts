import express, {Application, Request, Response} from "express" ;
import { env } from "../src/config/env";
import { logRequest } from "./middleware/log.middleware";
import bikeRoutes from "./routes/bikes";
import { swaggerSpec } from "../src/config/swagger";
import swaggerUi from "swagger-ui-express";
import {connectDB} from '../src/config/database';

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
 app.use('/api/v1/bikes', logRequest, bikeRoutes); //tell app to use the bikeRoutes for any requests that start with /bikes

    app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
    ); // serves swagger documentation at /api-docs

    const startServer = async () => {
        await connectDB();
      
        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
        });
      };
      startServer();