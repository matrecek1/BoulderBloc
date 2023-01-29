"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoulderModel = void 0;
const mongoose_1 = require("mongoose");
const gym_interfaces_1 = require("../interfaces/gym.interfaces");
const BoulderSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true
    },
    rating: {
        averageRating: {},
        ratings: [{
                type: String
            }]
    },
    grade: {
        activeGrade: {
            type: String,
        },
        proposedGrades: [{
                type: String
            }]
    }
});
BoulderSchema.loadClass(gym_interfaces_1.Boulder);
exports.BoulderModel = (0, mongoose_1.model)("BoulderModel", BoulderSchema);
//# sourceMappingURL=boulder.js.map