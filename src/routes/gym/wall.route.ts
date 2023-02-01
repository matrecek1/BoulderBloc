import { Router, RequestHandler } from "express"
import { validateRating, getGymById } from "../../middleware/gym/gym.middleware"
import { validateWallInput, validateWallUpdateInput } from "../../middleware/gym/wall.middleware"
import { catchAsync } from "../../utils/catchAsync"
import { WallController } from "../../controller/gym/wall.controller"

//they all need gymId
const router = Router()
const controller = new WallController()
router.post('/:gymId/walls', validateWallInput, getGymById,catchAsync(controller.addWall))

router.get('/:gymId/walls', getGymById, catchAsync(controller.getWalls))

router.get('/:gymId/walls/:wallId', getGymById, catchAsync(controller.getWall))

//patch and delete
router.delete('/:gymId/walls/:wallId', getGymById, catchAsync(controller.deleteWall))

router.patch('/:gymId/walls/:wallId', validateWallUpdateInput, getGymById, catchAsync(controller.updateWall))

router.patch('/:gymId/walls/:wallId/ratings', validateRating, getGymById, catchAsync(controller.addRating))


export default router
