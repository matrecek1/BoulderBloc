import {Schema, model} from 'mongoose'
import { Boulder } from '../interfaces/gym.interfaces'

const BoulderSchema = new Schema<Boulder>({
    name: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true
    },
    rating: {
        averageRating:{
        },
        ratings:[{
        }]
    },
    grade:{
        activeGrade: {
            type: String,
        },
        proposedGrades:[{
            type: String
        }]
    }
})
BoulderSchema.loadClass(Boulder)

export const BoulderModel = model<Boulder>("BoulderModel", BoulderSchema)
