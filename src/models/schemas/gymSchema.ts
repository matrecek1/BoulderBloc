import * as Joi from 'joi'

export const gymSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(4).max(200).required(),
}); 

export const gymUpdateSchema =Joi.object({
    name: Joi.string().min(2).max(30),
    description: Joi.string().min(4).max(200)
})

export const ratingSchema =Joi.object({
    rating: Joi.number().min(1).max(5).required()
})