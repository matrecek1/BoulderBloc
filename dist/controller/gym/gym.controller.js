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
exports.GymController = void 0;
const gym_interfaces_1 = require("../../models/interfaces/gym.interfaces");
const gym_1 = require("../../models/models/gym");
const expressError_1 = require("../../utils/expressError");
class GymController {
    //add rating
    //update some data-description or name
    addGym(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description } = req.validatedBody;
            const gym = new gym_interfaces_1.CGym(name, description);
            const newGym = new gym_1.Gym(gym);
            const savedGym = yield newGym.save();
            return res.status(201).json({ message: "gym added", savedGym });
        });
    }
    getGyms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gyms = yield gym_1.Gym.find();
            return res.status(200).json({ gyms });
        });
    }
    getGym(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gymId = req.params.gymId;
            const gym = yield gym_1.Gym.findById(gymId);
            if (!gym)
                throw new expressError_1.ExpressError("Gym not found", 404);
            return res.status(200).json({ gym });
        });
    }
}
exports.GymController = GymController;
//# sourceMappingURL=gym.controller.js.map