import { RequestHandler, Request, Response, NextFunction } from "express";
import { CGym, AllRatings, Rateable } from "../../models/types/gym.types"
import { Wall } from "../../models/types/wall.types";
import { Boulder } from "../../models/types/boulders.types";
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
        const boulderId = req.params.boulderId
        const boulder = await BoulderModel.findById(boulderId)
        if (!boulder) return res.status(404).json({ message: "Boulder not found" })
        res.status(200).json(boulder);
    }

    async deleteBoulder(req: Request, res: Response) {
        const boulderId = req.params.boulderId
        const deletedBoulder = await BoulderModel.findByIdAndDelete(boulderId)
        res.status(200).json({ message: "boulder deleted", deletedBoulder });
    }
    async updateBoulder(req: Request, res: Response) {
        const boulderId = req.params.boulderId
        const update = req.validatedBody
        const boulder = await BoulderModel.findByIdAndUpdate(boulderId, update);
        res.status(200).json({ message: "boulder updated" });
    }

    async addRating(req: Request, res: Response) {
        const rating: AllRatings = req.validatedBody
        console.log(rating);
        const boulderId = req.params.boulderId
        const boulder = await BoulderModel.findById(boulderId).select("rating")
        if (!boulder) return new ExpressError("Boulder not found", 404)
        boulder.addRating(rating)
        const savedBoulder = await boulder.save()
        res.status(201).json({ message: "Rating added", savedBoulder })
    }
    async proposeGrade(req: Request, res: Response) {
        const grade = req.validatedBody
        const boulderId = req.params.boulderId
        const boulder = await BoulderModel.findById(boulderId)
        if (!boulder) return res.status(404).json({ message: "Boulder not found" })
        boulder.proposeGrade(grade)
        const savedBoulder = await boulder.save()
        res.status(201).json({ message: "Grade proposed", savedBoulder })
    }
    async changeGrade(req: Request, res: Response) {
        const grade = req.validatedBody
        const boulderId = req.params.boulderId
        const boulder = await BoulderModel.findById(boulderId).select("grade")
        if (!boulder) return res.status(404).json({ message: "Boulder not found" })
        const savedBoulder = await boulder.save()
        res.status(201).json({ message: "Grade changed", savedBoulder })
    }
    // next are ratings and boulder grade suggestions
}