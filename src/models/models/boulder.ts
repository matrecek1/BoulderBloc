import { Schema, model } from 'mongoose'
import { Boulder } from '../types/boulders.types'

export const BoulderSchema = new Schema<Boulder>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgName: {
        type: String,
    },
    rating: {
        averageRating: {
        },
        ratings: [{
            type: String
        }]
    },
    grade: {
        activeGrade: {
            type: String,
        },
        proposedGrades: [{
            type: String
        }]
    }
})
BoulderSchema.loadClass(Boulder)

export const BoulderModel = model<Boulder>("BoulderModel", BoulderSchema)
