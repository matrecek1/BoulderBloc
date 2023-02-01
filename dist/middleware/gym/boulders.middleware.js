"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGrade = exports.validateBoulderUpdateInput = exports.validateBoulderInput = void 0;
const boulderSchema_1 = require("../../models/schemas/boulderSchema");
const expressError_1 = require("../../utils/expressError");
const validateBoulderInput = (req, res, next) => {
    const validatedInput = boulderSchema_1.boulderSchema.validate(req.body);
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new expressError_1.ExpressError(msg, 400);
    }
    req.validatedBody = validatedInput.value;
    next();
};
exports.validateBoulderInput = validateBoulderInput;
const validateBoulderUpdateInput = (req, res, next) => {
    const validatedInput = boulderSchema_1.boulderUpdateSchema.validate(req.body);
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new expressError_1.ExpressError(msg, 400);
    }
    req.validatedBody = validatedInput.value;
    next();
};
exports.validateBoulderUpdateInput = validateBoulderUpdateInput;
const verifyGrade = (req, res, next) => {
    if (!req.body.grade) {
        throw new expressError_1.ExpressError("No input", 400);
    }
    req.validatedBody = req.body.grade;
    next();
};
exports.verifyGrade = verifyGrade;
//# sourceMappingURL=boulders.middleware.js.map