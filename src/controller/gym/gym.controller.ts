import { RequestHandler, Request, Response } from "express";
import mongoose from "mongoose"
import { CGym, Wall, Boulder } from "../../models/interfaces/gym.interfaces"
import { Gym } from "../../models/models/gym";
import { ExpressError } from "../../utils/expressError";

export class GymController{
    //add rating
    //update some data-description or name
    async addGym(req: Request, res: Response) {
        const { name, description } = req.validatedBody
        const gym = new CGym(name, description);
        const newGym = new Gym(gym)
        const savedGym = await newGym.save()
        return res.status(201).json({ message: "gym added", savedGym })
    }
    async getGyms(req: Request, res: Response) {
        const gyms = await Gym.find()
        return res.status(200).json({gyms})
    }
    async getGym(req: Request, res: Response) {
        const gymId = req.params.gymId
        const gym = await Gym.findById(gymId)
        if(!gym) throw new ExpressError("Gym not found", 404)
        return res.status(200).json({ gym })
    }
}

