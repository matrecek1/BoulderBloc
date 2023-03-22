import { Request, Response, NextFunction } from "express";
import { Gym } from "../../models/models/gym";
import { wallSchema, wallUpdateSchema } from "../../models/schemas/wallSchema";
import { ExpressError } from "../../utils/expressError";

export const validateWallInput = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const validatedInput = wallSchema.validate(req.body)
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    }
    req.validatedBody = validatedInput.value
    next()
}

export const validateWallUpdateInput = (req: Request, res: Response, next: NextFunction) => {
    const validatedInput = wallUpdateSchema.validate(req.body)
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    }
    req.validatedBody = validatedInput.value
    next()
}

export const getWallById = (req: Request, res: Response, next: NextFunction) =>{
    try{
        const { wallId } = req.params
        const gym = req.gym
        let wall = gym.findWall(wallId)
        if (!wall) return new ExpressError("wall not found", 404)
        req.wall = wall
        next()
    }
    catch(err){
        next(err)
    }
}

export const getWallWithBoulders = async(req: Request, res:Response, next: NextFunction) =>{
    try {
        const { wallId, gymId } = req.params
        const wall = await Gym.findOne({"walls.name":"Buben"})
        if (!wall) return new ExpressError("wall not found", 404)
        req.wall = wall
        next()
    }
    catch (err) {
        next(err)
    }
}
