"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gym_controller_1 = require("../../controller/gym/gym.controller");
const gym_middleware_1 = require("../../middleware/gym/gym.middleware");
const catchAsync_1 = require("../../utils/catchAsync");
const router = (0, express_1.Router)();
const controller = new gym_controller_1.GymController();
//GYMS
router.get('/', (0, catchAsync_1.catchAsync)(controller.getGyms)); //gets all gyms
router.post('/', gym_middleware_1.validateGymInput, (0, catchAsync_1.catchAsync)(controller.addGym)); // creates new gym
router.get('/:gymId', (0, catchAsync_1.catchAsync)(controller.getGym)); //gets one gym
router.put('/:gymId'); //update one gym
router.delete('/:gymId'); // deletes one gym
router.patch(':gymId/ratings'); //add Rating
// router.get('/', catchAsync(controller.getBoulders)) // gets all boulders
// router.post('/', validateBoulderInput, catchAsync(controller.addBoulder))
// router.get('/:boulderId', catchAsync(controller.getBoulder) as RequestHandler) // gets one boulder
// router.patch('/:boulderId', validateBoulderUpdateInput, catchAsync(controller.updateBoulder)) // updates one boulder
// router.delete('/:boulderId', catchAsync(controller.deleteBoulder)) // deletes one boulder
// router.post('/:boulderId/ratings', verifyRating, catchAsync(controller.addRating))//add rating
// router.patch('/:boulderId/grades/propose-grade', verifyGrade, catchAsync(controller.proposeGrade))//propose grade intoi array of proposed grades
// router.patch('/:boulderId/grades/change-grade', verifyGrade, catchAsync(controller.changeGrade))//change the grade
exports.default = router;
//# sourceMappingURL=gym.route.js.map