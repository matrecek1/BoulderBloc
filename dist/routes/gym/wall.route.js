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
router.post('/:gymId/walls', wall_middleware_1.validateWallInput, (0, catchAsync_1.catchAsync)(controller.addWall));
router.get('/:gymId/walls', (0, catchAsync_1.catchAsync)(controller.getWalls));
//patch and delete
router.patch('/:gymId/walls/:wallId', wall_middleware_1.validateWallUpdateInput, (0, catchAsync_1.catchAsync)(controller.updateWall));
router.patch('/:gymId/walls/:wallId/ratings', gym_middleware_1.validateRating, (0, catchAsync_1.catchAsync)(controller.addRating));
exports.default = router;
//# sourceMappingURL=wall.route.js.map