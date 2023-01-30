import { RequestHandler, Request, Response } from "express";
import mongoose from "mongoose"
import { CGym, Wall, Boulder } from "../../models/interfaces/gym.interfaces"
import { Gym } from "../../models/models/gym";
import { ExpressError } from "../../utils/expressError";
import { AllRatings } from "../../models/interfaces/gym.interfaces";

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
    async updateGym(req: Request, res:Response){
        const gymId = req.params.gymId
        const update = req.validatedBody
        await Gym.findByIdAndUpdate(gymId, update)
        return res.status(200).json({message:"Successfully updated"})
    }
    async deleteGym(req:Request, res:Response){
        const gymId = req.params.gymId
        const deletedGym = await Gym.findByIdAndDelete(gymId)
        if(!deletedGym) throw new ExpressError("Gym not found", 404)
        return res.status(200).json({message:"Successfully deleted", deletedGym})
    }
    async addRating(req: Request, res: Response) {
        const rating: AllRatings = req.validatedBody
        const gymId = req.params.gymId
        const gym = await Gym.findById(gymId).select("rating")
        if (!gym) return new ExpressError("gym not found", 404)
        gym.addRating(rating)
        const savedGym = await gym.save()
        res.status(201).json({ message: "Rating added", savedGym })
    }
}

