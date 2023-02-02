"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGrade = exports.validateBoulderUpdateInput = exports.validateBoulderInput = void 0;
const boulderSchema_1 = require("../../models/schemas/boulderSchema");
const expressError_1 = require("../../utils/expressError");
const boulderSchema_2 = require("../../models/schemas/boulderSchema");
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
    console.log('req.body :>> ', req.body);
    const validatedInput = boulderSchema_1.boulderUpdateSchema.validate(req.body);
    if (validatedInput.error) {
        let msg = validatedInput.error.details.map((el) => el.message).join(",");
        throw new expressError_1.ExpressError(msg, 400);
    }
    req.validatedBody = validatedInput.value;
    console.log('req.validatedBody :>> ', req.validatedBody);
    next();
};
exports.validateBoulderUpdateInput = validateBoulderUpdateInput;
const verifyGrade = (req, res, next) => {
    const validatedGrade = (0, boulderSchema_2.validateGrade)(req.body.grade.toUpperCase());
    if (!validatedGrade)
        throw new expressError_1.ExpressError("Invalid Grade", 400);
    req.validatedBody = validatedGrade;
    next();
};
exports.verifyGrade = verifyGrade;
//# sourceMappingURL=boulders.middleware.js.map