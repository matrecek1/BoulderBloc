"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WallModel = void 0;
const mongoose_1 = require("mongoose");
const gym_interfaces_1 = require("../interfaces/gym.interfaces");
const boulder_1 = require("./boulder");
const WallSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        averageRating: {},
        ratings: [{}]
    },
    boulders: [boulder_1.BoulderModel]
});
WallSchema.loadClass(gym_interfaces_1.Wall);
exports.WallModel = (0, mongoose_1.model)("WallModel", WallSchema);
//# sourceMappingURL=wall.js.map