"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catchAsync_1 = require("../../utils/catchAsync");
const boulders_controller_1 = require("../../controller/gym/boulders.controller");
const boulders_middleware_1 = require("../../middleware/gym/boulders.middleware");
const gym_middleware_1 = require("../../middleware/gym/gym.middleware");
const wall_middleware_1 = require("../../middleware/gym/wall.middleware");
const router = (0, express_1.Router)();
const controller = new boulders_controller_1.BouldersController();
router.get('/:gymId/walls/:wallId/boulders', gym_middleware_1.getGymById, wall_middleware_1.getWallById, (0, catchAsync_1.catchAsync)(controller.getBoulders));
router.post('/:gymId/walls/:wallId/boulders', boulders_middleware_1.validateBoulderInput, gym_middleware_1.getGymById, wall_middleware_1.getWallById, (0, catchAsync_1.catchAsync)(controller.addBoulder));
router.get('/:gymId/walls/:wallId/boulders/:boulderId', gym_middleware_1.getGymById, wall_middleware_1.getWallById, boulders_middleware_1.getBoulderById, (0, catchAsync_1.catchAsync)(controller.getBoulder)); // gets one boulder
router.patch('/:gymId/walls/:wallId/boulders/:boulderId', boulders_middleware_1.validateBoulderUpdateInput, gym_middleware_1.getGymById, wall_middleware_1.getWallById, boulders_middleware_1.getBoulderById, (0, catchAsync_1.catchAsync)(controller.updateBoulder)); // updates one boulder
router.delete('/:gymId/walls/:wallId/boulders/:boulderId', gym_middleware_1.getGymById, wall_middleware_1.getWallById, (0, catchAsync_1.catchAsync)(controller.deleteBoulder)); // deletes one boulder
router.post('/:gymId/walls/:wallId/boulders/:boulderId/ratings', gym_middleware_1.validateRating, gym_middleware_1.getGymById, wall_middleware_1.getWallById, boulders_middleware_1.getBoulderById, (0, catchAsync_1.catchAsync)(controller.addRating)); //add rating
router.patch('/:gymId/walls/:wallId/boulders/:boulderId/grades', boulders_middleware_1.verifyGrade, gym_middleware_1.getGymById, wall_middleware_1.getWallById, boulders_middleware_1.getBoulderById, (0, catchAsync_1.catchAsync)(controller.proposeGrade)); //propose grade intoi array of proposed grades
exports.default = router;
//# sourceMappingURL=boulders.route.js.map