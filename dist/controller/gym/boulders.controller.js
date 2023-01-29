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
const gym_interfaces_1 = require("../../models/interfaces/gym.interfaces");
const boulder_1 = require("../../models/models/boulder");
class BouldersController {
    addBoulder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // req.body must have: name, description, bGrade, imgUrl
            const { name, description, bGrade, imgUrl } = req.body;
            //this validation is completely basic and only validates if they exist, it should check for more
            if (!name || !description || !bGrade || !imgUrl) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            const boulder = new gym_interfaces_1.Boulder(name, description, bGrade, imgUrl);
            const newBoulder = new boulder_1.BoulderModel(boulder);
            const savedBoulder = yield newBoulder.save();
            return res.status(201).json({ message: "boulder added", savedBoulder });
        });
    }
    getBoulders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const boulders = yield boulder_1.BoulderModel.find();
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
            let update = {};
            if (req.body.imgUrl && req.body.imgUrl.length)
                update.imgUrl = req.body.imgUrl;
            if (req.body.name && req.body.name.length)
                update.name = req.body.name;
            if (req.body.description && req.body.description.length)
                update.description = req.body.description;
            //add some validations and move them away from here
            const boulder = yield boulder_1.BoulderModel.findByIdAndUpdate(boulderId, update);
            res.status(200).json({ message: "boulder updated", boulder });
        });
    }
    addRating(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rating = req.body.rating;
            const boulderId = req.params.boulderId;
            const boulder = yield boulder_1.BoulderModel.findById(boulderId).select("rating");
            if (!boulder)
                return res.status(404).json({ message: "Boulder not found" });
            boulder.addRating(rating);
            const savedBoulder = yield boulder.save();
            res.status(201).json({ message: "Rating added", savedBoulder });
        });
    }
    proposeGrade(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //validate grade
            const grade = req.body.grade;
            const boulderId = req.params.boulderId;
            const boulder = yield boulder_1.BoulderModel.findById(boulderId);
            console.log(boulder);
            if (!boulder)
                return res.status(404).json({ message: "Boulder not found" });
            boulder.proposeGrade(grade);
            const savedBoulder = yield boulder.save();
            res.status(201).json({ message: "Grade proposed", savedBoulder });
        });
    }
    changeGrade(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const grade = req.body.grade;
            const boulderId = req.params.boulderId;
            const boulder = yield boulder_1.BoulderModel.findById(boulderId).select("grade");
            if (!boulder)
                return res.status(404).json({ message: "Boulder not found" });
            boulder.changeActiveGrade(grade);
            const savedBoulder = yield boulder.save();
            res.status(201).json({ message: "Grade changed", savedBoulder });
        });
    }
}
exports.BouldersController = BouldersController;
//# sourceMappingURL=boulders.controller.js.map