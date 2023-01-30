import { RequestHandler, Request, Response } from "express";
import mongoose from "mongoose"
import { CGym, Wall, Boulder } from "../../models/interfaces/gym.interfaces"
import { Gym } from "../../models/models/gym";
import { WallModel } from "../../models/models/wall";
import { ExpressError } from "../../utils/expressError";
import { AllRatings } from "../../models/interfaces/gym.interfaces";

export class WallController{
    async addWall(req: Request, res: Response) {
        //verify the input
        const { name, description, angle } = req.body
        const gymId = req.params.gymId
        const wall = new Wall(name, description, parseInt(angle))
        const gym = await Gym.findById(gymId)
        if (!gym) throw new ExpressError("Gym not found", 404)
        gym.addWall(wall)
        const savedGym = await gym.save()
        res.status(201).json({ message: "Wall created", savedGym })
    }
    async getWalls(req: Request, res: Response) {
        const gymId = req.params.gymId
        const gym = await Gym.findById(gymId).select('walls')
        if (!gym) throw new ExpressError("Gym not found", 404)
        res.status(200).json(gym.walls)
    }
    async addRating(req: Request, res: Response) {
        const rating: AllRatings = req.body.rating
        const {gymId, wallId} = req.params
        const gym = await Gym.findById(gymId)
        if (!gym) return new ExpressError("gym not found", 404)
        let wall = gym.walls.find(wall => wall._id.toString() === wallId)
        if (!wall) return new ExpressError("wall not found", 404)
        wall.addRating(rating)
        const savedGym = await gym.save()
        res.status(201).json({ message: "Rating added", savedGym })
    }
    //patch route for angle name and description
    //add tons of verifications
}