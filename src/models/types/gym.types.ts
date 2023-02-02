import { ExpressError } from "../../utils/expressError";
import { Gym, GymSchema } from "../models/gym";
import { Boulder } from "./boulders.types";
import { Wall } from "./wall.types";

declare global {
    namespace Express {
        interface Request {
            validatedBody: any;
            gym: any;
            wall: any;
        }
    }
}

export enum AllRatings {
    OneStar = 1,
    TwoStars = 2,
    ThreeStars = 3,
    FourStars = 4,
    FiveStars = 5
}
export interface Rateable {
    rating: {
        averageRating: number | 'Not Rated';
        ratings: AllRatings[]
    }
}


export class CGym implements Rateable {
    rating: {
        averageRating: number | 'Not Rated';
        ratings: AllRatings[]
    }
    walls: Wall[]
    constructor(public name: string, public description: string) {
        this.rating = {
            averageRating: 'Not Rated',
            ratings: []
        }
        this.walls = []
    }
    addWall(wall: Wall) {
        this.walls.push(wall)
    }
    findWall(wallId: string) {
        let wall = this.walls.find(wall => wall._id.toString() === wallId)
        return wall
    }
    deleteWall(wallId: string) {
        let wallIndex = this.walls.findIndex(wall => wall._id.toString() === wallId)
        if (wallIndex === -1) throw new ExpressError("Wall not found", 404)
        const deletedWall = this.walls.splice(wallIndex, 1)
    }
    updateAverageRating() {
        const average = this.rating.ratings.reduce((a, b) => a + b, 0) / this.rating.ratings.length
        this.rating.averageRating = parseFloat(average.toFixed(1))
    }
    addRating(rating: number) {
        this.rating.ratings.push(rating)
        this.updateAverageRating()
    }
}



