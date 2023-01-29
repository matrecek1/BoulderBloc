"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRating = exports.validateGymUpdateInput = exports.validateGymInput = void 0;
const gymSchema_1 = require("../../models/schemas/gymSchema");
const expressError_1 = require("../../utils/expressError");
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
//# sourceMappingURL=gym.middleware.js.map