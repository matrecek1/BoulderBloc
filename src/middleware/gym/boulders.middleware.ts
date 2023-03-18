import { Request, Response, NextFunction } from "express";
import { boulderSchema, boulderUpdateSchema } from "../../models/schemas/boulderSchema";
import { ExpressError } from "../../utils/expressError";
import { validateGrade } from "../../models/schemas/boulderSchema";
import { Wall } from "../../models/types/wall.types";
import { Boulder, BoulderDescriptors, BoulderDescriptorsUpdate } from "../../models/types/boulders.types";
import { putImageToAWS, IAWSPutParams} from "../../utils/awsUpload";
import { randomHexName } from "../../utils/helpers";
import sharp from 'sharp'


export const validateBoulderInput = (req: Request, res: Response, next: NextFunction) => {
    const validatedInput = boulderSchema.validate(req.body)
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    }
    const getRandomId = randomHexName(8)
    console.log('getRandomId :>> ', getRandomId);
    req.validatedBody = { ...validatedInput.value, _id: getRandomId }
    next()
}

export const validateBoulderUpdateInput = (req: Request, res: Response, next: NextFunction) => {
    const validatedInput = boulderUpdateSchema.validate(req.body)
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    }
    const validatedUpdate = validatedInput.value as BoulderDescriptorsUpdate
    if (validatedUpdate.bGrade) {
        if (!validateGrade(validatedUpdate.bGrade)) throw new ExpressError("Invalid grade", 400)
    }
    req.validatedBody = validatedUpdate
    next()
}

export const verifyGrade = (req: Request, res: Response, next: NextFunction) => {
    const validatedGrade = validateGrade(req.body.grade.toUpperCase())
    if (!validatedGrade) throw new ExpressError("Invalid Grade", 400)
    req.validatedBody = validatedGrade
    next()
}

export const getBoulderById = (req: Request, res: Response, next: NextFunction) => {
    const boulderId = req.params.boulderId
    const wall = req.wall as Wall
    const boulder = wall.findBoulder(boulderId)
    if (!boulder) throw new ExpressError("boulder not found", 404)
    req.boulder = boulder
    next()
}

export const processImage = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) throw new ExpressError("Missing Image file!", 400)
    try {
        const buffer = await sharp(req.file.buffer).resize({ height: 1920, width: 1080, fit: "contain" }).withMetadata().toBuffer()
        const imageName = randomHexName(8)
        req.body.imgName = imageName
        const params: IAWSPutParams = {
            fileName: imageName,
            buffer: buffer,
            mimetype: req.file.mimetype
        }
        putImageToAWS(params)
        next()
    } catch (err) {
        throw new ExpressError("Processing of image failed!", 500)
    }
}
