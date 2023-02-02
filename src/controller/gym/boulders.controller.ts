import { RequestHandler, Request, Response, NextFunction } from "express";
import { CGym, AllRatings, Rateable } from "../../models/types/gym.types"
import { Wall } from "../../models/types/wall.types";
import { Boulder, BoulderDescriptorsUpdate, Grade } from "../../models/types/boulders.types";
import { BoulderModel } from "../../models/models/boulder";
import { ExpressError } from "../../utils/expressError";


export class BouldersController {
    async addBoulder(req: Request, res: Response) {
        const { name, description, bGrade, imgUrl } = req.validatedBody
        const boulder = new Boulder(name, description, bGrade, imgUrl);
        const wall = req.wall
        wall.addBoulder(boulder)
        const gym = req.gym
        gym.save()
        return res.status(201).json({ message: "boulder added", wall })
    }

    async getBoulders(req: Request, res: Response) {
        const wall = req.wall
        const boulders = wall.boulders
        res.status(200).json(boulders);
    }

    async getBoulder(req: Request, res: Response) {
        const boulder = req.boulder
        res.status(200).json(boulder);
    }

    async deleteBoulder(req: Request, res: Response) {
        const gym = req.gym
        const boulderId = req.params.boulderId
        const wall = req.wall
        const deletedBoulder = wall.deleteBoulder(boulderId)
        gym.save()
        res.status(200).json({ message: "boulder deleted", deletedBoulder });
    }
    async updateBoulder(req: Request, res: Response) {
        const boulder = req.boulder
        const gym = req.gym
        const update = req.validatedBody as BoulderDescriptorsUpdate
        boulder.updateBoulder(update)
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