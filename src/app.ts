import express, { RequestHandler, Request, Response, NextFunction } from "express"
import { BoulderModel } from "./models/models/boulder";
import mongoose from 'mongoose'
import { Boulder } from "./models/types/boulders.types";
import { ExpressError } from "./utils/expressError";

import boulderRoutes from "./routes/gym/boulders.route"
import gymRoutes from "./routes/gym/gym.route"
import wallRoutes from "./routes/gym/wall.route"

const app = express();


async function main() {
    mongoose.set('strictQuery', false)
    await mongoose.connect("mongodb://127.0.0.1:27017/BoulderApp");
    console.log(`connected to db`);
}
main().catch(err => console.log(err));

app.use(express.json())

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


app.listen('3000', () => {
    console.log(`Listening on port 3000, Url: http://localhost:3000`);
});


