"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WallModel = exports.WallSchema = void 0;
const mongoose_1 = require("mongoose");
const wall_types_1 = require("../types/wall.types");
const boulder_1 = require("./boulder");
exports.WallSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    angle: {
        type: Number
    },
    rating: {
        averageRating: {},
        ratings: [{}]
    },
    boulders: [boulder_1.BoulderSchema]
});
exports.WallSchema.loadClass(wall_types_1.Wall);
exports.WallModel = (0, mongoose_1.model)("WallModel", exports.WallSchema);
//# sourceMappingURL=wall.js.map