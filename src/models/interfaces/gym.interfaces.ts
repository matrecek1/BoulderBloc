
export enum AllRatings{
    OneStar = 1,
    TwoStars = 2,
    ThreeStars= 3,
    FourStars = 4,
    FiveStars = 5
}
export interface Rateable {
    rating: {
        averageRating: number | 'Not Rated';
        ratings: AllRatings[]
    }
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
    constructor(public name:string, public description:string, bGrade:string,public imgUrl:string){
        this.rating = {
            averageRating: 'Not Rated',
            ratings: []
        }
        this.grade = {
            activeGrade: bGrade,
            proposedGrades: []
        }
    }
    proposeGrade(grade: string){
        this.grade.proposedGrades.push(grade)
    }
    changeActiveGrade(grade:string){
        this.grade.activeGrade = grade
    }
    updateAverageRating(){
        const average = this.rating.ratings.reduce((a, b) => a + b, 0) / this.rating.ratings.length
        this.rating.averageRating = parseFloat(average.toFixed(1))
    }
    addRating(rating:number){
        this.rating.ratings.push(rating)
        this.updateAverageRating()
    }
}

export class Wall implements Rateable{
    rating: {
        averageRating: number | 'Not Rated';
        ratings: AllRatings[]
    }
    boulders: Boulder[]
    constructor(public name: string, public description: string,public angle: number) {
        this.rating = {
            averageRating: 'Not Rated',
            ratings: []
        }
        this.boulders = []
    }
    addBoulder(boulder:Boulder){
        this.boulders.push(boulder)
    }
    updateAverageRating() {
        const average = this.rating.ratings.reduce((a, b) => a + b, 0) / this.rating.ratings.length
        this.rating.averageRating = average
    }
    addRating(rating: number) {
        this.rating.ratings.push(rating)
        this.updateAverageRating()
    }
}


export class CGym implements Rateable {
    rating: {
        averageRating: number| 'Not Rated';
        ratings: AllRatings[]
    }
    walls: Wall[]
    constructor(private name:string, private description:string){
        this.rating = {
            averageRating: 'Not Rated',
            ratings:[]
        }
        this.walls = []
    }
    addWall(wall:Wall){
        this.walls.push(wall)
    }
    updateAverageRating() {
        const average = this.rating.ratings.reduce((a, b) => a + b, 0) / this.rating.ratings.length
        this.rating.averageRating = average
    }
    addRating(rating: number) {
        this.rating.ratings.push(rating)
        this.updateAverageRating()
    }
}



