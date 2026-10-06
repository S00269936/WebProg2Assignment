import express, {Application, Request, Response} from "express" ;

const PORT = process.env.PORT || 5050;
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
    
    

