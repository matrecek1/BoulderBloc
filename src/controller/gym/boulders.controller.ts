import { Request, Response, NextFunction } from "express";
import { AllRatings} from "../../models/types/gym.types"
import { Boulder, BoulderDescriptorsUpdate, Grade } from "../../models/types/boulders.types";
import { ExpressError } from "../../utils/expressError";

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: '../.env' })
import { deleteImageFromAWS, getImageFromAws } from "../../utils/awsUpload";




export class BouldersController {
    async addBoulder(req: Request, res: Response) {
        const boulder = new Boulder(req.validatedBody);
        const wall = req.wall
        wall.addBoulder(boulder)
        const gym = req.gym
        gym.save()
        return res.status(201).json({ message: "boulder added", wall })
    }

    async getBoulders(req: Request, res: Response) {
        const {boulders} = req.wall
        for(let boulder of boulders){
            let imgUrl = await getImageFromAws(boulder.imgName)
            boulder.imgUrl = imgUrl
        }
        res.status(200).json(boulders);
    }

    async getBoulder(req: Request, res: Response) {
        const boulder = req.boulder
        const imgUrl = await getImageFromAws(boulder.imgName)
        boulder.imgUrl = imgUrl
        res.status(200).json(boulder);
    }

    async deleteBoulder(req: Request, res: Response) {
        const gym = req.gym
        const boulderId = req.params.boulderId
        const wall = req.wall
        const deletedBoulder = wall.deleteBoulder(boulderId)
        await deleteImageFromAWS(deletedBoulder.imgName)
        await gym.save()
        res.status(200).json({ message: "boulder deleted", deletedBoulder });
    }
    async deleteAllBoulders(req:Request, res:Response) {
        const gym = req.gym
        const wall = req.wall
        const deletedBoulders = wall.deleteAllBoulders()
        if(wall.boulders.length !== 0) throw new ExpressError("Delete failed", 500)
        //function to cascade delete all images from aws that belong to the deleted wall
        for(let boulder of deletedBoulders){
            await deleteImageFromAWS(boulder.imgName)
        }
        await gym.save()
        res.status(200).json({ message:"deleted all boulders"})
    }
    async updateBoulder(req: Request, res: Response) {
        const boulder = req.boulder
        const gym = req.gym
        const update = req.validatedBody as BoulderDescriptorsUpdate
        boulder.updateBoulder(req.validatedBody)
        gym.save()
        res.status(200).json({ message: "boulder updated", boulder});
    }

    async addRating(req: Request, res: Response) {
        const gym = req.gym
        const rating: AllRatings = req.validatedBody
        const boulder = req.boulder
        boulder.addRating(rating)
        gym.save()
        res.status(201).json({ message: "Rating added", boulder})
    }
    async proposeGrade(req: Request, res: Response) {
        const gym = req.gym
        const grade = req.validatedBody as Grade
        const boulder = req.boulder
        boulder.proposeGrade(grade)
        gym.save()
        res.status(201).json({ message: "Grade proposed", boulder})
    }
}