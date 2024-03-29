import { Schema, model } from 'mongoose'
import { Wall } from '../types/wall.types'
import { BoulderSchema } from './boulder'


export const WallSchema = new Schema<Wall>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    angle: {
        type: Number
    },
    rating: {
        averageRating: {
        },
        ratings: [{
        }]
    },
    boulders: [BoulderSchema]
})

WallSchema.loadClass(Wall)
export const WallModel = model<Wall>("WallModel", WallSchema)