import { Request, Response, NextFunction } from "express";
import { boulderSchema, boulderUpdateSchema } from "../../models/schemas/boulderSchema";
import { ExpressError } from "../../utils/expressError";


export const validateBoulderInput = (req: Request, res: Response, next: NextFunction) => {
    const validatedInput = boulderSchema.validate(req.body)
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    }
    req.validatedBody = validatedInput.value
    next()
}

export const validateBoulderUpdateInput = (req: Request, res: Response, next: NextFunction) => {
    console.log('req.body :>> ', req.body);
    const validatedInput = boulderUpdateSchema.validate(req.body)
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    }
    req.validatedBody = validatedInput.value
    console.log('req.validatedBody :>> ', req.validatedBody);
    next()
}

export const verifyGrade = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.grade) {
        throw new ExpressError("No input", 400)
    }
    req.validatedBody = req.body.grade
    next()
}
