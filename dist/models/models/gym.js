"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gym = exports.GymSchema = void 0;
const mongoose_1 = require("mongoose");
const gym_interfaces_1 = require("../interfaces/gym.interfaces");
const wall_1 = require("./wall");
exports.GymSchema = new mongoose_1.Schema({
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
    walls: [wall_1.WallSchema]
});
exports.GymSchema.loadClass(gym_interfaces_1.CGym);
exports.Gym = (0, mongoose_1.model)("Gym", exports.GymSchema);
//# sourceMappingURL=gym.js.map