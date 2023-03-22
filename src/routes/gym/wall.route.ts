import { Router, RequestHandler } from "express"
import { validateRating, getWallsFromGymById, getGymById } from "../../middleware/gym/gym.middleware"
import { getWallById, getWallWithBoulders, validateWallInput, validateWallUpdateInput } from "../../middleware/gym/wall.middleware"
import { catchAsync } from "../../utils/catchAsync"
import { WallController } from "../../controller/gym/wall.controller"


//they all need gymId
const router = Router()
const controller = new WallController()
router.post('/:gymId/walls', validateWallInput, getWallsFromGymById, catchAsync(controller.addWall))

router.get('/:gymId/walls', getWallsFromGymById, catchAsync(controller.getWalls))

router.get('/:gymId/walls/:wallId', getWallWithBoulders, catchAsync(controller.getWall))

//patch and delete
router.delete('/:gymId/walls/:wallId', getGymById, catchAsync(controller.deleteWall))

router.patch('/:gymId/walls/:wallId', validateWallUpdateInput, getWallsFromGymById, getWallById, catchAsync(controller.updateWall))

router.patch('/:gymId/walls/:wallId/ratings', validateRating, getWallsFromGymById, getWallById, catchAsync(controller.addRating))


export default router
