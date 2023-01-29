import { Request, Response, NextFunction } from "express";
import { gymSchema, gymUpdateSchema, ratingSchema } from "../../models/schemas/gymSchema";
import { ExpressError } from "../../utils/expressError";

export const validateGymInput = (req: Request, res: Response, next: NextFunction) => {
    const validatedInput = gymSchema.validate(req.body)
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    }
    req.validatedBody = validatedInput.value
    next()
}

export const validateGymUpdateInput = (req: Request, res: Response, next: NextFunction) => {
    const validatedInput = gymUpdateSchema.validate(req.body)
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    }
    req.validatedBody = validatedInput.value
    next()
}

export const validateRating = (req: Request, res: Response, next: NextFunction) => {
    const validatedInput = ratingSchema.validate(req.body)
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    }
    req.validatedBody = validatedInput.value.rating
    next()
}