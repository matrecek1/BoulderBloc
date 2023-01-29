"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gym = void 0;
const mongoose_1 = require("mongoose");
const gym_interfaces_1 = require("../interfaces/gym.interfaces");
const GymSchema = new mongoose_1.Schema({
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
    walls: [{}]
});
GymSchema.loadClass(gym_interfaces_1.CGym);
exports.Gym = (0, mongoose_1.model)("Gym", GymSchema);
//# sourceMappingURL=gym.js.map