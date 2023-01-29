import * as Joi from 'joi'

export const gymSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(4).required(),
}); 