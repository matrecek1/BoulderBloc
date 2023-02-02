"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoulderModel = exports.BoulderSchema = void 0;
const mongoose_1 = require("mongoose");
const boulders_types_1 = require("../types/boulders.types");
exports.BoulderSchema = new mongoose_1.Schema({
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
exports.BoulderSchema.loadClass(boulders_types_1.Boulder);
exports.BoulderModel = (0, mongoose_1.model)("BoulderModel", exports.BoulderSchema);
//# sourceMappingURL=boulder.js.map