import { Router, RequestHandler } from "express"
import { validateGymInput, validateGymUpdateInput, validateRating } from "../../middleware/gym/gym.middleware"
import { catchAsync } from "../../utils/catchAsync"
import { WallController } from "../../controller/gym/wall.controller"

//they all need gymId
const router = Router()
const controller = new WallController()
router.post('/:gymId/walls', catchAsync(controller.addWall))

router.get('/:gymId/walls', catchAsync(controller.getWalls))

//patch and delete
router.patch('/:gymId/walls/:wallId', catchAsync(controller.updateWall))

router.patch('/:gymId/walls/:wallId/ratings', catchAsync(controller.addRating))


export default router
