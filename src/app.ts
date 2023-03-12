import express, { RequestHandler, Request, Response, NextFunction } from "express"
import mongoose from 'mongoose'
import { ExpressError } from "./utils/expressError";
import boulderRoutes from "./routes/gym/boulders.route"
import gymRoutes from "./routes/gym/gym.route"
import wallRoutes from "./routes/gym/wall.route"
import cors from "cors"
import * as dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })

const port = process.env.PORT || '3000'
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/BoulderApp'

const app = express();

async function main() {
    mongoose.set('strictQuery', false)
    await mongoose.connect(mongoUrl);
    console.log(`connected to db`);
}
main().catch(err => console.log(err));

app.use(express.json())
app.use(cors())

app.use('/gyms', gymRoutes)
app.use('/gyms', wallRoutes)
app.use('/gyms', boulderRoutes)


app.all("*", (req, res, next) => {
    next(new ExpressError("page not found", 404));
});
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ExpressError) {
        return res.status(err.statusCode).json({ message: err.message });
    } else {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}, Url: http://localhost:${port}`);
});


