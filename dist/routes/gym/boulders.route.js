"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catchAsync_1 = require("../../utils/catchAsync");
const boulders_controller_1 = require("../../controller/gym/boulders.controller");
const router = (0, express_1.Router)();
const controller = new boulders_controller_1.BouldersController();
router.get('/', (0, catchAsync_1.catchAsync)(controller.getBoulders)); // gets all boulders
router.post('/', (0, catchAsync_1.catchAsync)(controller.addBoulder));
router.get('/:boulderId', (0, catchAsync_1.catchAsync)(controller.getBoulder)); // gets one boulder
router.patch('/:boulderId', (0, catchAsync_1.catchAsync)(controller.updateBoulder)); // updates one boulder
router.delete('/:boulderId', (0, catchAsync_1.catchAsync)(controller.deleteBoulder)); // deletes one boulder
router.post('/:boulderId/ratings', (0, catchAsync_1.catchAsync)(controller.addRating)); //add rating
router.patch('/:boulderId/grades/propose-grade', (0, catchAsync_1.catchAsync)(controller.proposeGrade)); //propose grade intoi array of proposed grades
router.patch('/:boulderId/grades/change-grade', (0, catchAsync_1.catchAsync)(controller.changeGrade)); //change the grade
exports.default = router;
//# sourceMappingURL=boulders.route.js.map