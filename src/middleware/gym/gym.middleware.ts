import { Request, Response, NextFunction } from "express";
import { gymSchema } from "../../models/schemas/gymSchema";
import { ExpressError } from "../../utils/expressError";

export const validateGymInput = (req: Request, res: Response, next: NextFunction) => {
    console.log("hi");
    const validatedInput = gymSchema.validate(req.body)
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    }
    req.validatedBody = validatedInput.value
    next()
}