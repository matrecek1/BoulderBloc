"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWallUpdateInput = exports.validateWallInput = void 0;
const wallSchema_1 = require("../../models/schemas/wallSchema");
const expressError_1 = require("../../utils/expressError");
const validateWallInput = (req, res, next) => {
    console.log(req.body);
    const validatedInput = wallSchema_1.wallSchema.validate(req.body);
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new expressError_1.ExpressError(msg, 400);
    }
    req.validatedBody = validatedInput.value;
    next();
};
exports.validateWallInput = validateWallInput;
const validateWallUpdateInput = (req, res, next) => {
    const validatedInput = wallSchema_1.wallUpdateSchema.validate(req.body);
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new expressError_1.ExpressError(msg, 400);
    }
    req.validatedBody = validatedInput.value;
    next();
};
exports.validateWallUpdateInput = validateWallUpdateInput;
//# sourceMappingURL=wall.middleware.js.map