"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGymInput = void 0;
const gymSchema_1 = require("../../models/schemas/gymSchema");
const expressError_1 = require("../../utils/expressError");
const validateGymInput = (req, res, next) => {
    console.log("hi");
    const validatedInput = gymSchema_1.gymSchema.validate(req.body);
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new expressError_1.ExpressError(msg, 400);
    }
    req.validatedBody = validatedInput.value;
    next();
};
exports.validateGymInput = validateGymInput;
//# sourceMappingURL=gym.middleware.js.map