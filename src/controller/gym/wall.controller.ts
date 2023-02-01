import { RequestHandler, Request, Response } from "express";
import mongoose from "mongoose"
import { CGym, Wall, Boulder, WallDescriptorsUpdate, WallDescriptors } from "../../models/interfaces/gym.interfaces"
import { Gym } from "../../models/models/gym";
import { WallModel } from "../../models/models/wall";
import { ExpressError } from "../../utils/expressError";
import { AllRatings } from "../../models/interfaces/gym.interfaces";

export class WallController {
    async addWall(req: Request, res: Response) {
        const { name, description, angle } = req.validatedBody as WallDescriptors
        const wall = new Wall(name, description, angle)
        const gym = req.gym
        gym.addWall(wall)
        const savedGym = await gym.save()
        res.status(201).json({ message: "Wall created", savedGym })
    }
    async getWalls(req: Request, res: Response) {
        const gym = req.gym
        res.status(200).json(gym.walls)
    }
    async getWall(req: Request, res: Response) {
        const { wallId } = req.params
        const gym = req.gym
        let wall = gym.findWall(wallId)
        if (!wall) return new ExpressError("wall not found", 404)
        res.status(200).json({ message: "Wall found", wall })
    }
    async addRating(req: Request, res: Response) {
        const rating: AllRatings = req.body.rating
        const { wallId } = req.params
        const gym = req.gym
        let wall = gym.findWall(wallId)
        if (!wall) return new ExpressError("wall not found", 404)
        wall.addRating(rating)
        const savedGym = await gym.save()
        res.status(201).json({ message: "Rating added", savedGym })
    }
    async updateWall(req: Request, res: Response) {
        const { wallId } = req.params
        const update: WallDescriptorsUpdate = req.validatedBody
        const gym = req.gym
        let wall = gym.findWall(wallId)
        if (!wall) return new ExpressError("wall not found", 404)
        wall.updateWall(update)
        await gym.save()
        return res.status(200).json({ message: "Successfully updated wall", wall })
    }
    async deleteWall(req: Request, res: Response) {
        const { wallId } = req.params
        const gym = req.gym
        gym.deleteWall(wallId)
        await gym.save()
        return res.status(200).json({ message: "Successfully deleted wall" })
    }
    //add tons of verifications
}