import { Rateable } from "./gym.types";
import { AllRatings } from "./gym.types";

export interface BoulderDescriptors {
    name: string;
    description: string;
    bGrade: Grade;
    imgName: string;
    _id: string;
}


export type Grade = "5" | "5A" | "5A+" | "5B" | '5B+' | "5C" | "5C+" | "6A" |
    "6A+" | "6B" | '6B+' | "6C" | "6C+" | "7A" | "7A+" | "7B" | '7B+' | "7C" | "7C+" |
    "8A" | "8A+" | "8B" | '8B+' | "8C" | "8C+"

export interface BoulderDescriptorsUpdate {
    name?: string,
    description?: string,
    bGrade?: Grade,
    imgName?: string
}

export class Boulder implements Rateable {
    name: string;
    description: string;
    imgName: string;
    _id: string;
    rating: {
        averageRating: AllRatings| 'Not Rated';
        ratings: AllRatings[]
    }
    grade: {
        activeGrade: Grade;
        proposedGrades: Grade[];
    }
    imgUrl?: string;
    constructor(descriptors:BoulderDescriptors) {
        this.name = descriptors.name
        this.imgName = descriptors.imgName
        this.description = descriptors.description
        this._id = descriptors._id
        this.rating = {
            averageRating: 'Not Rated',
            ratings: []
        }
        this.grade = {
            activeGrade: descriptors.bGrade,
            proposedGrades: []
        }
    }
    proposeGrade(grade: Grade) {
        this.grade.proposedGrades.push(grade)
    }
    updateBoulder(update: BoulderDescriptorsUpdate) {
        if (update.name) this.name = update.name
        if (update.description) this.description = update.description
        if (update.bGrade) this.grade.activeGrade = update.bGrade
        if (update.imgName) this.imgName = update.imgName
    }
    updateAverageRating() {
        const average = this.rating.ratings.reduce((a, b) => {
            if(typeof a !== 'number') a = parseInt(a)
            if(typeof b !== 'number') b = parseInt(b)
            return a + b
        }) / this.rating.ratings.length
        console.log(average);
        this.rating.averageRating = parseFloat(average.toFixed(1))
    }
    addRating(rating: AllRatings) {
        if(typeof rating === "string") parseInt(rating)
        this.rating.ratings.push(rating)
        this.updateAverageRating()
    }
}