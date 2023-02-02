"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boulderUpdateSchema = exports.boulderSchema = exports.validateGrade = void 0;
const Joi = __importStar(require("joi"));
const possibleGrades = ["5", "5A", "5A+", "5B", '5B+', "5C", "5C+", "6A",
    "6A+", "6B", '6B+', "6C", "6C+", "7A", "7A+", "7B", '7B+', "7C", "7C+",
    "8A", "8A+", "8B", '8B+', "8C", "8C+"];
const validateGrade = (grade) => {
    if (possibleGrades.includes(grade))
        return grade;
    return;
};
exports.validateGrade = validateGrade;
exports.boulderSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(4).required(),
    bGrade: Joi.string().required(),
    imgUrl: Joi.string().required()
});
exports.boulderUpdateSchema = Joi.object({
    name: Joi.string().min(2).max(30),
    imgUrl: Joi.string(),
    description: Joi.string().min(4),
    bGrade: Joi.string(),
});
//# sourceMappingURL=boulderSchema.js.map