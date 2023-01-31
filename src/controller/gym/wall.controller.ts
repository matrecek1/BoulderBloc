import { RequestHandler, Request, Response } from "express";
import mongoose from "mongoose"
import { CGym, Wall, Boulder, WallDescriptorsUpdate, WallDescriptors } from "../../models/interfaces/gym.interfaces"
import { Gym } from "../../models/models/gym";
import { WallModel } from "../../models/models/wall";
import { ExpressError } from "../../utils/expressError";
import { AllRatings } from "../../models/interfaces/gym.interfaces";

export class WallController {
    async addWall(req: Request, res: Response) {
        console.log("im here");
        const { name, description, angle } = req.validatedBody as WallDescriptors
        const gymId = req.params.gymId
        const wall = new Wall(name, description, angle)
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
        const { gymId, wallId } = req.params
        const gym = await Gym.findById(gymId)
        if (!gym) return new ExpressError("gym not found", 404)
        let wall = gym.findWall(wallId)
        if (!wall) return new ExpressError("wall not found", 404)
        wall.addRating(rating)
        const savedGym = await gym.save()
        res.status(201).json({ message: "Rating added", savedGym })
    }
    async updateWall(req: Request, res: Response) {
        const { gymId, wallId } = req.params
        //validate req.body
        const update:WallDescriptorsUpdate = req.validatedBody
        const gym = await Gym.findById(gymId)
        if (!gym) return new ExpressError("gym not found", 404)
        let wall = gym.findWall(wallId)
        if (!wall) return new ExpressError("wall not found", 404)
        wall.updateWall(update)
        await gym.save()
        return res.status(200).json({ message: "Successfully updated", wall })
    }
    //add tons of verifications
}