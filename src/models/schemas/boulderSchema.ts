import * as Joi from 'joi'

export const boulderSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(4).required(),
    bGrade: Joi.string().required(),
    imgUrl: Joi.string().required()
}); 

export const boulderUpdateSchema = Joi.object({
    name: Joi.string().min(2).max(30),
    imgUrl: Joi.string(),
    description: Joi.string().min(4),
})
