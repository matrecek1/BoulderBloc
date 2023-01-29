"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catchAsync_1 = require("../../utils/catchAsync");
const boulders_controller_1 = require("../../controller/gym/boulders.controller");
const boulders_middleware_1 = require("../../middleware/gym/boulders.middleware");
const router = (0, express_1.Router)();
const controller = new boulders_controller_1.BouldersController();
router.get('/', (0, catchAsync_1.catchAsync)(controller.getBoulders)); // gets all boulders
router.post('/', boulders_middleware_1.validateBoulderInput, (0, catchAsync_1.catchAsync)(controller.addBoulder));
router.get('/:boulderId', (0, catchAsync_1.catchAsync)(controller.getBoulder)); // gets one boulder
router.patch('/:boulderId', boulders_middleware_1.validateBoulderUpdateInput, (0, catchAsync_1.catchAsync)(controller.updateBoulder)); // updates one boulder
router.delete('/:boulderId', (0, catchAsync_1.catchAsync)(controller.deleteBoulder)); // deletes one boulder
router.post('/:boulderId/ratings', boulders_middleware_1.verifyRating, (0, catchAsync_1.catchAsync)(controller.addRating)); //add rating
router.patch('/:boulderId/grades/propose-grade', boulders_middleware_1.verifyGrade, (0, catchAsync_1.catchAsync)(controller.proposeGrade)); //propose grade intoi array of proposed grades
router.patch('/:boulderId/grades/change-grade', boulders_middleware_1.verifyGrade, (0, catchAsync_1.catchAsync)(controller.changeGrade)); //change the grade
exports.default = router;
//# sourceMappingURL=boulders.route.js.map