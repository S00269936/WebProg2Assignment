import express, {Application, Request, Response} from "express" ;
import { env } from "../src/config/env";

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
    
    

