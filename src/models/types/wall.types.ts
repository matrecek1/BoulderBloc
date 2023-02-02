import { AllRatings } from "./gym.types";
import { Rateable } from "./gym.types";
import { Boulder } from "./boulders.types";
import { ExpressError } from "../../utils/expressError";

export interface WallDescriptors {
    name: string,
    description: string,
    angle: number
}

export interface WallDescriptorsUpdate {
    name?: string,
    description?: string,
    angle?: number
}

export class Wall implements Rateable {
    rating: {
        averageRating: number | 'Not Rated';
        ratings: AllRatings[]
    }
    _id: any
    boulders: Boulder[]
    constructor(public name: string, public description: string, public angle: number) {
        this.rating = {
            averageRating: 'Not Rated',
            ratings: []
        }
        this.boulders = []
    }
    addBoulder(boulder: Boulder) {
        this.boulders.push(boulder)
    }
    findBoulder(boulderId: string) {
        let boulder = this.boulders.find(boulder => boulder._id.toString() === boulderId)
        return boulder
    }
    deleteBoulder(boulderId: string) {
        let boulderIndex = this.boulders.findIndex(boulder => boulder._id.toString() === boulderId)
        if (boulderIndex === -1) throw new ExpressError("boulder not found", 404)//Probably shouldnt be here.
        const deletedboulder = this.boulders.splice(boulderIndex, 1)
    }
    updateAverageRating() {
        const average = this.rating.ratings.reduce((a, b) => a + b, 0) / this.rating.ratings.length
        this.rating.averageRating = parseFloat(average.toFixed(1))
    }
    addRating(rating: number) {
        this.rating.ratings.push(rating)
        this.updateAverageRating()
    }
    updateWall(update: WallDescriptorsUpdate) {
        if (update.name) this.name = update.name
        if (update.description) this.description = update.description
        if (update.angle) this.angle = update.angle
    }
}