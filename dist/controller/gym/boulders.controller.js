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
exports.BouldersController = void 0;
const boulders_types_1 = require("../../models/types/boulders.types");
const boulder_1 = require("../../models/models/boulder");
const expressError_1 = require("../../utils/expressError");
class BouldersController {
    addBoulder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, bGrade, imgUrl } = req.validatedBody;
            const boulder = new boulders_types_1.Boulder(name, description, bGrade, imgUrl);
            const wall = req.wall;
            wall.addBoulder(boulder);
            const gym = req.gym;
            gym.save();
            return res.status(201).json({ message: "boulder added", wall });
        });
    }
    getBoulders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const wall = req.wall;
            const boulders = wall.boulders;
            res.status(200).json(boulders);
        });
    }
    getBoulder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const boulderId = req.params.boulderId;
            const boulder = yield boulder_1.BoulderModel.findById(boulderId);
            if (!boulder)
                return res.status(404).json({ message: "Boulder not found" });
            res.status(200).json(boulder);
        });
    }
    deleteBoulder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const boulderId = req.params.boulderId;
            const deletedBoulder = yield boulder_1.BoulderModel.findByIdAndDelete(boulderId);
            res.status(200).json({ message: "boulder deleted", deletedBoulder });
        });
    }
    updateBoulder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const boulderId = req.params.boulderId;
            const update = req.validatedBody;
            const boulder = yield boulder_1.BoulderModel.findByIdAndUpdate(boulderId, update);
            res.status(200).json({ message: "boulder updated" });
        });
    }
    addRating(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rating = req.validatedBody;
            console.log(rating);
            const boulderId = req.params.boulderId;
            const boulder = yield boulder_1.BoulderModel.findById(boulderId).select("rating");
            if (!boulder)
                return new expressError_1.ExpressError("Boulder not found", 404);
            boulder.addRating(rating);
            const savedBoulder = yield boulder.save();
            res.status(201).json({ message: "Rating added", savedBoulder });
        });
    }
    proposeGrade(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const grade = req.validatedBody;
            const boulderId = req.params.boulderId;
            const boulder = yield boulder_1.BoulderModel.findById(boulderId);
            if (!boulder)
                return res.status(404).json({ message: "Boulder not found" });
            boulder.proposeGrade(grade);
            const savedBoulder = yield boulder.save();
            res.status(201).json({ message: "Grade proposed", savedBoulder });
        });
    }
    changeGrade(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const grade = req.validatedBody;
            const boulderId = req.params.boulderId;
            const boulder = yield boulder_1.BoulderModel.findById(boulderId).select("grade");
            if (!boulder)
                return res.status(404).json({ message: "Boulder not found" });
            const savedBoulder = yield boulder.save();
            res.status(201).json({ message: "Grade changed", savedBoulder });
        });
    }
}
exports.BouldersController = BouldersController;
//# sourceMappingURL=boulders.controller.js.map