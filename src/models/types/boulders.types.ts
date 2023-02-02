import { Rateable } from "./gym.types";
import { AllRatings } from "./gym.types";

export interface BoulderDescriptors {
    name: string,
    description: string,
    bGrade: string,
    imgUrl: string
}

export interface BoulderDescriptorsUpdate {
    name?: string,
    description?: string,
    bGrade?: string,
    imgUrl?: string
}

export class Boulder implements Rateable {
    rating: {
        averageRating: number | 'Not Rated';
        ratings: AllRatings[]
    }
    grade: {
        activeGrade: string;
        proposedGrades: string[];
    }
    _id: any;
    constructor(public name: string, public description: string, bGrade: string, public imgUrl: string) {
        this.rating = {
            averageRating: 'Not Rated',
            ratings: []
        }
        this.grade = {
            activeGrade: bGrade,
            proposedGrades: []
        }
    }
    proposeGrade(grade: string) {
        this.grade.proposedGrades.push(grade)
    }
    updateBoulder(update: BoulderDescriptorsUpdate) {
        if (update.name) this.name = update.name
        if (update.description) this.description = update.description
        if (update.bGrade) this.grade.activeGrade = update.bGrade
        if (update.imgUrl) this.imgUrl = update.imgUrl
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