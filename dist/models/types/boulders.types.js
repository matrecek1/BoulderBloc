"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Boulder = void 0;
class Boulder {
    constructor(name, description, bGrade, imgUrl) {
        this.name = name;
        this.description = description;
        this.imgUrl = imgUrl;
        this.rating = {
            averageRating: 'Not Rated',
            ratings: []
        };
        this.grade = {
            activeGrade: bGrade,
            proposedGrades: []
        };
    }
    proposeGrade(grade) {
        this.grade.proposedGrades.push(grade);
    }
    updateBoulder(update) {
        if (update.name)
            this.name = update.name;
        if (update.description)
            this.description = update.description;
        if (update.bGrade)
            this.grade.activeGrade = update.bGrade;
        if (update.imgUrl)
            this.imgUrl = update.imgUrl;
    }
    updateAverageRating() {
        const average = this.rating.ratings.reduce((a, b) => a + b, 0) / this.rating.ratings.length;
        this.rating.averageRating = parseFloat(average.toFixed(1));
    }
    addRating(rating) {
        this.rating.ratings.push(rating);
        this.updateAverageRating();
    }
}
exports.Boulder = Boulder;
//# sourceMappingURL=boulders.types.js.map