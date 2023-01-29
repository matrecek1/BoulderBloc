import express, {RequestHandler, Request, Response, NextFunction} from "express"
import { BoulderModel } from "./models/models/boulder";
import mongoose from 'mongoose'
import { Boulder } from "./models/interfaces/gym.interfaces";
import justBoulders from "./routes/gym/boulders.route"

const app = express();


async function main() {
    mongoose.set('strictQuery', false)
    await mongoose.connect("mongodb://127.0.0.1:27017/BoulderApp");
    console.log(`connected to db`);
}
main().catch(err => console.log(err));

app.use(express.json())

app.use("/boulders", justBoulders)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).render("error", { err })
})


app.listen('3000', () => {
    console.log(`Listening on port 3000, Url: http://localhost:3000`);
});


