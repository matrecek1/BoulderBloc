"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WallController = void 0;
const gym_interfaces_1 = require("../../models/interfaces/gym.interfaces");
const gym_1 = require("../../models/models/gym");
const expressError_1 = require("../../utils/expressError");
class WallController {
    addWall(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //verify the input
            const { name, description, angle } = req.body;
            const gymId = req.params.gymId;
            const wall = new gym_interfaces_1.Wall(name, description, parseInt(angle));
            const gym = yield gym_1.Gym.findById(gymId);
            if (!gym)
                throw new expressError_1.ExpressError("Gym not found", 404);
            gym.addWall(wall);
            const savedGym = yield gym.save();
            res.status(201).json({ message: "Wall created", savedGym });
        });
    }
    getWalls(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gymId = req.params.gymId;
            const gym = yield gym_1.Gym.findById(gymId).select('walls');
            if (!gym)
                throw new expressError_1.ExpressError("Gym not found", 404);
            res.status(200).json(gym.walls);
        });
    }
    addRating(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rating = req.body.rating;
            const { gymId, wallId } = req.params;
            const gym = yield gym_1.Gym.findById(gymId);
            if (!gym)
                return new expressError_1.ExpressError("gym not found", 404);
            let wall = gym.findWall(wallId);
            if (!wall)
                return new expressError_1.ExpressError("wall not found", 404);
            wall.addRating(rating);
            const savedGym = yield gym.save();
            res.status(201).json({ message: "Rating added", savedGym });
        });
    }
    updateWall(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { gymId, wallId } = req.params;
            //validate req.body
            const update = req.body;
            const gym = yield gym_1.Gym.findById(gymId);
            if (!gym)
                return new expressError_1.ExpressError("gym not found", 404);
            let wall = gym.findWall(wallId);
            if (!wall)
                return new expressError_1.ExpressError("wall not found", 404);
            wall.name = req.body.name;
            yield gym.save();
            return res.status(200).json({ message: "Successfully updated", wall });
        });
    }
}
exports.WallController = WallController;
//# sourceMappingURL=wall.controller.js.map