import { Schema, model } from 'mongoose'
import { CGym } from '../interfaces/gym.interfaces'
import { WallModel } from './wall'

const GymSchema = new Schema<CGym>({
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
    walls:[WallModel]
})

GymSchema.loadClass(CGym)
export const Gym = model<CGym>("Gym", GymSchema)
