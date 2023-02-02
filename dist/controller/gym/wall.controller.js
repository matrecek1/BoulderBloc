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
const wall_types_1 = require("../../models/types/wall.types");
const expressError_1 = require("../../utils/expressError");
class WallController {
    addWall(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, angle } = req.validatedBody;
            const wall = new wall_types_1.Wall(name, description, angle);
            const gym = req.gym;
            gym.addWall(wall);
            const savedGym = yield gym.save();
            res.status(201).json({ message: "Wall created", savedGym });
        });
    }
    getWalls(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gym = req.gym;
            res.status(200).json(gym.walls);
        });
    }
    getWall(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { wallId } = req.params;
            const gym = req.gym;
            let wall = gym.findWall(wallId);
            if (!wall)
                return new expressError_1.ExpressError("wall not found", 404);
            res.status(200).json({ message: "Wall found", wall });
        });
    }
    addRating(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rating = req.body.rating;
            const { wallId } = req.params;
            const gym = req.gym;
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
            const { wallId } = req.params;
            const update = req.validatedBody;
            const gym = req.gym;
            let wall = gym.findWall(wallId);
            if (!wall)
                return new expressError_1.ExpressError("wall not found", 404);
            wall.updateWall(update);
            yield gym.save();
            return res.status(200).json({ message: "Successfully updated wall", wall });
        });
    }
    deleteWall(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { wallId } = req.params;
            const gym = req.gym;
            gym.deleteWall(wallId);
            yield gym.save();
            return res.status(200).json({ message: "Successfully deleted wall" });
        });
    }
}
exports.WallController = WallController;
//# sourceMappingURL=wall.controller.js.map