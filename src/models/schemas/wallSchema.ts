import * as Joi from 'joi'

export const wallSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(4).max(200).required(),
    angle: Joi.number().required()
});

export const wallUpdateSchema = Joi.object({
    name: Joi.string().min(2).max(30),
    description: Joi.string().min(4).max(200),
    angle: Joi.number().min(-60).max(90)
})

