import mongoose, { Schema, model } from 'mongoose'
import { CGym } from '../types/gym.types'
import { WallSchema } from './wall'


export const GymSchema = new Schema<CGym>({
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
    walls: [WallSchema]
})

GymSchema.loadClass(CGym)
export const Gym = model<CGym>("Gym", GymSchema)
