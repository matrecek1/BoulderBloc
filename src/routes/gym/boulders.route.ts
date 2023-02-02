import { Router, RequestHandler } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { BouldersController } from "../../controller/gym/boulders.controller"
import { validateBoulderInput, validateBoulderUpdateInput, verifyGrade} from "../../middleware/gym/boulders.middleware"
import { getGymById, validateRating } from "../../middleware/gym/gym.middleware"
import { getWallById } from "../../middleware/gym/wall.middleware"
const router = Router()

const controller = new BouldersController()

router.get('/:gymId/walls/:wallId/boulders', getGymById, getWallById,catchAsync(controller.getBoulders))

router.post('/:gymId/walls/:wallId/boulders', validateBoulderInput, getGymById, getWallById, catchAsync(controller.addBoulder))

router.get('/:gymId/walls/:wallId/boulders', catchAsync(controller.getBoulder) as RequestHandler) // gets one boulder

router.patch('/:gymId/walls/:wallId/boulders', validateBoulderUpdateInput, catchAsync(controller.updateBoulder)) // updates one boulder

router.delete('/:gymId/walls/:wallId/boulders/:boulderId', catchAsync(controller.deleteBoulder)) // deletes one boulder

router.post('/:gymId/walls/:wallId/boulders/:boulderId/ratings', validateRating, catchAsync(controller.addRating))//add rating

router.patch('/:gymId/walls/:wallId/boulders/:boulderId/grades', verifyGrade, catchAsync(controller.proposeGrade))//propose grade intoi array of proposed grades


export default router