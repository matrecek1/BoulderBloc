import { Request, Response } from "express";
import { Wall, WallDescriptors, WallDescriptorsUpdate } from "../../models/types/wall.types";
import { ExpressError } from "../../utils/expressError";
import { AllRatings} from "../../models/types/gym.types";
import { Boulder } from "../../models/types/boulders.types";
import { deleteImageFromAWS, getImageFromAws } from "../../utils/awsUpload";

export class WallController {
    async addWall(req: Request, res: Response) {
        const { name, description, angle } = req.validatedBody as WallDescriptors
        const wall = new Wall(name, description, angle)
        const gym = req.gym
        gym.addWall(wall)
        const savedGym = await gym.save()
        res.status(201).json({ message: "Wall created", savedWall:savedGym.walls[savedGym.walls.length -1] })
    }
    async getWalls(req: Request, res: Response) {
        const gym = req.gym
        res.status(200).json(gym.walls)
    }
    async getWall(req: Request, res: Response) {
        const wall = req.wall
        if (!wall) return new ExpressError("wall not found", 404)
        res.status(200).json({ message: "Wall found", wall })
    }
    async addRating(req: Request, res: Response) {
        const rating: AllRatings = req.body.rating
        const gym = req.gym
        let wall = req.wall
        wall.addRating(rating)
        const savedGym = await gym.save()
        res.status(201).json({ message: "Rating added", savedGym })
    }
    async updateWall(req: Request, res: Response) {
        const update: WallDescriptorsUpdate = req.validatedBody
        const gym = req.gym
        let wall = req.wall
        wall.updateWall(update)
        await gym.save()
        return res.status(200).json({ message: "Successfully updated wall", wall })
    }
    async deleteWall(req: Request, res: Response) {
        const { wallId } = req.params
        const gym = req.gym
        const deletedWall= gym.deleteWall(wallId)
        if(deletedWall.boulders.length){
            for (let boulder of deletedWall.boulders) {
                await deleteImageFromAWS(boulder.imgName)
            }
        }
        await gym.save()
        return res.status(200).json({ message: "Successfully deleted wall" })
    }
    //add tons of verifications
}