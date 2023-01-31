"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CGym = exports.Wall = exports.Boulder = exports.AllRatings = void 0;
var AllRatings;
(function (AllRatings) {
    AllRatings[AllRatings["OneStar"] = 1] = "OneStar";
    AllRatings[AllRatings["TwoStars"] = 2] = "TwoStars";
    AllRatings[AllRatings["ThreeStars"] = 3] = "ThreeStars";
    AllRatings[AllRatings["FourStars"] = 4] = "FourStars";
    AllRatings[AllRatings["FiveStars"] = 5] = "FiveStars";
})(AllRatings = exports.AllRatings || (exports.AllRatings = {}));
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
    changeActiveGrade(grade) {
        this.grade.activeGrade = grade;
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
class Wall {
    constructor(name, description, angle) {
        this.name = name;
        this.description = description;
        this.angle = angle;
        this.rating = {
            averageRating: 'Not Rated',
            ratings: []
        };
        this.boulders = [];
    }
    addBoulder(boulder) {
        this.boulders.push(boulder);
    }
    updateAverageRating() {
        const average = this.rating.ratings.reduce((a, b) => a + b, 0) / this.rating.ratings.length;
        this.rating.averageRating = parseFloat(average.toFixed(1));
    }
    addRating(rating) {
        this.rating.ratings.push(rating);
        this.updateAverageRating();
    }
    updateWall(body) {
        //
    }
}
exports.Wall = Wall;
class CGym {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.rating = {
            averageRating: 'Not Rated',
            ratings: []
        };
        this.walls = [];
    }
    addWall(wall) {
        this.walls.push(wall);
    }
    findWall(wallId) {
        let wall = this.walls.find(wall => wall._id.toString() === wallId);
        return wall;
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
exports.CGym = CGym;
//# sourceMappingURL=gym.interfaces.js.map