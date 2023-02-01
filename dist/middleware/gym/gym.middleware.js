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
exports.getGymById = exports.validateRating = exports.validateGymUpdateInput = exports.validateGymInput = void 0;
const gymSchema_1 = require("../../models/schemas/gymSchema");
const expressError_1 = require("../../utils/expressError");
const gym_1 = require("../../models/models/gym");
const validateGymInput = (req, res, next) => {
    const validatedInput = gymSchema_1.gymSchema.validate(req.body);
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new expressError_1.ExpressError(msg, 400);
    }
    req.validatedBody = validatedInput.value;
    next();
};
exports.validateGymInput = validateGymInput;
const validateGymUpdateInput = (req, res, next) => {
    const validatedInput = gymSchema_1.gymUpdateSchema.validate(req.body);
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new expressError_1.ExpressError(msg, 400);
    }
    req.validatedBody = validatedInput.value;
    next();
};
exports.validateGymUpdateInput = validateGymUpdateInput;
const validateRating = (req, res, next) => {
    const validatedInput = gymSchema_1.ratingSchema.validate(req.body);
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new expressError_1.ExpressError(msg, 400);
    }
    req.validatedBody = validatedInput.value.rating;
    next();
};
exports.validateRating = validateRating;
const getGymById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gymId } = req.params;
        const gym = yield gym_1.Gym.findById(gymId);
        if (!gym)
            throw new expressError_1.ExpressError("gym not found", 404);
        req.gym = gym;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.getGymById = getGymById;
//# sourceMappingURL=gym.middleware.js.map