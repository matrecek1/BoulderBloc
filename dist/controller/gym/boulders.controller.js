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
            const boulder = req.boulder;
            res.status(200).json(boulder);
        });
    }
    deleteBoulder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gym = req.gym;
            const boulderId = req.params.boulderId;
            const wall = req.wall;
            const deletedBoulder = wall.deleteBoulder(boulderId);
            gym.save();
            res.status(200).json({ message: "boulder deleted", deletedBoulder });
        });
    }
    updateBoulder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const boulder = req.boulder;
            const gym = req.gym;
            const update = req.validatedBody;
            boulder.updateBoulder(update);
            gym.save();
            res.status(200).json({ message: "boulder updated", boulder });
        });
    }
    addRating(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gym = req.gym;
            const rating = req.validatedBody;
            const boulder = req.boulder;
            boulder.addRating(rating);
            gym.save();
            res.status(201).json({ message: "Rating added", boulder });
        });
    }
    proposeGrade(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gym = req.gym;
            const grade = req.validatedBody;
            const boulder = req.boulder;
            boulder.proposeGrade(grade);
            gym.save();
            res.status(201).json({ message: "Grade proposed", boulder });
        });
    }
}
exports.BouldersController = BouldersController;
//# sourceMappingURL=boulders.controller.js.map