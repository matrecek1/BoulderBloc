import { RequestHandler, Request, Response, NextFunction } from "express";
import { CGym, Wall, Boulder, AllRatings, Rateable } from "../../models/interfaces/gym.interfaces"
import { BoulderModel } from "../../models/models/boulder";
interface Updatable {
    name?: string,
    description?: string,
    imgUrl?: string,
    grade?: {
        activeGrade?: string
    }
}

export class BouldersController {
    async addBoulder(req: Request, res: Response) {
        // req.body must have: name, description, bGrade, imgUrl
        const { name, description, bGrade, imgUrl } = req.body
        //this validation is completely basic and only validates if they exist, it should check for more
        if (!name || !description || !bGrade || !imgUrl) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const boulder = new Boulder(name, description, bGrade, imgUrl);
        const newBoulder = new BoulderModel(boulder)
        const savedBoulder = await newBoulder.save()
        return res.status(201).json({ message: "boulder added", savedBoulder })
    }

    async getBoulders(req: Request, res: Response) {
        const boulders = await BoulderModel.find()
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
        let update: Updatable = {}
        if (req.body.imgUrl && req.body.imgUrl.length) update.imgUrl = req.body.imgUrl
        if (req.body.name && req.body.name.length) update.name = req.body.name
        if (req.body.description && req.body.description.length) update.description = req.body.description
        //add some validations and move them away from here
        const boulder = await BoulderModel.findByIdAndUpdate(boulderId, update);
        res.status(200).json({ message: "boulder updated", boulder });
    }
    
    async addRating(req: Request, res: Response) {
        const rating: AllRatings = req.body.rating
        const boulderId = req.params.boulderId
        const boulder = await BoulderModel.findById(boulderId).select("rating")
        if (!boulder) return res.status(404).json({ message: "Boulder not found" }) 
        boulder.addRating(rating)
        const savedBoulder = await boulder.save()
        res.status(201).json({message:"Rating added", savedBoulder})
    }
    async proposeGrade(req:Request, res:Response){
        //validate grade
        const grade = req.body.grade
        const boulderId = req.params.boulderId
        const boulder = await BoulderModel.findById(boulderId)
        console.log(boulder);
        if (!boulder) return res.status(404).json({ message: "Boulder not found" }) 
        boulder.proposeGrade(grade)
        const savedBoulder = await boulder.save()
        res.status(201).json({message:"Grade proposed",savedBoulder})
    }
    async changeGrade(req: Request, res: Response) {
        const grade = req.body.grade
        const boulderId = req.params.boulderId
        const boulder = await BoulderModel.findById(boulderId).select("grade")
        if (!boulder) return res.status(404).json({ message: "Boulder not found" })
        boulder.changeActiveGrade(grade)
        const savedBoulder = await boulder.save()
        res.status(201).json({ message: "Grade changed", savedBoulder})
    }
    // next are ratings and boulder grade suggestions
}