import { Schema, model } from 'mongoose'
import { Wall, Boulder } from '../interfaces/gym.interfaces'
import { BoulderModel } from './boulder'

const WallSchema = new Schema<Wall>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        averageRating: {
        },
        ratings: [{
        }]
    },
    boulders: [BoulderModel]
})

WallSchema.loadClass(Wall)
export const WallModel = model<Wall>("WallModel", WallSchema)