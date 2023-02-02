import { error } from 'console';
import * as Joi from 'joi'
import { Grade } from '../types/boulders.types';

const possibleGrades = ["5", "5A", "5A+", "5B", '5B+', "5C", "5C+", "6A",
    "6A+", "6B", '6B+', "6C", "6C+", "7A", "7A+", "7B", '7B+', "7C", "7C+",
    "8A", "8A+", "8B", '8B+', "8C", "8C+"]


export const validateGrade = (grade:string):Grade | void => {
    if(possibleGrades.includes(grade)) return grade as Grade
    return
}

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
    bGrade: Joi.string(),
})
