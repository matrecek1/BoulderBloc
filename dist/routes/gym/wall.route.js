"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gym_middleware_1 = require("../../middleware/gym/gym.middleware");
const wall_middleware_1 = require("../../middleware/gym/wall.middleware");
const catchAsync_1 = require("../../utils/catchAsync");
const wall_controller_1 = require("../../controller/gym/wall.controller");
//they all need gymId
const router = (0, express_1.Router)();
const controller = new wall_controller_1.WallController();
router.post('/:gymId/walls', wall_middleware_1.validateWallInput, gym_middleware_1.getGymById, (0, catchAsync_1.catchAsync)(controller.addWall));
router.get('/:gymId/walls', gym_middleware_1.getGymById, (0, catchAsync_1.catchAsync)(controller.getWalls));
router.get('/:gymId/walls/:wallId', gym_middleware_1.getGymById, (0, catchAsync_1.catchAsync)(controller.getWall));
//patch and delete
router.delete('/:gymId/walls/:wallId', gym_middleware_1.getGymById, (0, catchAsync_1.catchAsync)(controller.deleteWall));
router.patch('/:gymId/walls/:wallId', wall_middleware_1.validateWallUpdateInput, gym_middleware_1.getGymById, (0, catchAsync_1.catchAsync)(controller.updateWall));
router.patch('/:gymId/walls/:wallId/ratings', gym_middleware_1.validateRating, gym_middleware_1.getGymById, (0, catchAsync_1.catchAsync)(controller.addRating));
exports.default = router;
//# sourceMappingURL=wall.route.js.map