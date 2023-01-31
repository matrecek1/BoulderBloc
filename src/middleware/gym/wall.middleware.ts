import { Request, Response, NextFunction } from "express";
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