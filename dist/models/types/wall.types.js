"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wall = void 0;
const expressError_1 = require("../../utils/expressError");
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
    findBoulder(boulderId) {
        let boulder = this.boulders.find(boulder => boulder._id.toString() === boulderId);
        return boulder;
    }
    deleteBoulder(boulderId) {
        let boulderIndex = this.boulders.findIndex(boulder => boulder._id.toString() === boulderId);
        if (boulderIndex === -1)
            throw new expressError_1.ExpressError("boulder not found", 404); //Probably shouldnt be here.
        const deletedboulder = this.boulders.splice(boulderIndex, 1);
    }
    updateAverageRating() {
        const average = this.rating.ratings.reduce((a, b) => a + b, 0) / this.rating.ratings.length;
        this.rating.averageRating = parseFloat(average.toFixed(1));
    }
    addRating(rating) {
        this.rating.ratings.push(rating);
        this.updateAverageRating();
    }
    updateWall(update) {
        if (update.name)
            this.name = update.name;
        if (update.description)
            this.description = update.description;
        if (update.angle)
            this.angle = update.angle;
    }
}
exports.Wall = Wall;
//# sourceMappingURL=wall.types.js.map