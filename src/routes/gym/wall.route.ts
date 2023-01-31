import { Router, RequestHandler } from "express"
import { validateRating } from "../../middleware/gym/gym.middleware"
import { validateWallInput, validateWallUpdateInput } from "../../middleware/gym/wall.middleware"
import { catchAsync } from "../../utils/catchAsync"
import { WallController } from "../../controller/gym/wall.controller"

//they all need gymId
const router = Router()
const controller = new WallController()
router.post('/:gymId/walls', validateWallInput, catchAsync(controller.addWall))

router.get('/:gymId/walls', catchAsync(controller.getWalls))

//patch and delete
router.patch('/:gymId/walls/:wallId', validateWallUpdateInput,catchAsync(controller.updateWall))

router.patch('/:gymId/walls/:wallId/ratings', validateRating,catchAsync(controller.addRating))


export default router
