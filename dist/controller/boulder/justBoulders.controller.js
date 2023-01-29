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
const boulder_1 = require("../../models/models/boulder");
class BouldersController {
    addBoulder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const boulder = req.body;
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
            const id = req.params.id;
            const boulder = yield boulder_1.BoulderModel.findById(id);
            if (!boulder)
                return res.status(404).json({ message: "Boulder not found" });
            res.status(200).json(boulder);
        });
    }
    deleteBoulder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const deletedBoulder = yield boulder_1.BoulderModel.findByIdAndDelete(id);
            res.status(200).json({ message: "boulder deleted", deletedBoulder });
        });
    }
    updateBoulder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const updatedBoulder = req.body;
            //add some validations
            const boulder = yield boulder_1.BoulderModel.findByIdAndUpdate(id, updatedBoulder);
            res.status(200).json({ message: "boulder updated", boulder });
        });
    }
}
//# sourceMappingURL=justBoulders.controller.js.map