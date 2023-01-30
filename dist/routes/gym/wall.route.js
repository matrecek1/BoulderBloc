"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catchAsync_1 = require("../../utils/catchAsync");
const wall_controller_1 = require("../../controller/gym/wall.controller");
//they all need gymId
const router = (0, express_1.Router)();
const controller = new wall_controller_1.WallController();
router.post('/:gymId/walls', (0, catchAsync_1.catchAsync)(controller.addWall));
router.get('/:gymId/walls', (0, catchAsync_1.catchAsync)(controller.getWalls));
router.patch('/:gymId/walls/:wallId/ratings', (0, catchAsync_1.catchAsync)(controller.addRating));
exports.default = router;
//# sourceMappingURL=wall.route.js.map