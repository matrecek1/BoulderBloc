import { Router, RequestHandler } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { BouldersController } from "../../controller/gym/boulders.controller"
import { validateBoulderInput, validateBoulderUpdateInput, verifyGrade} from "../../middleware/gym/boulders.middleware"
import { validateRating } from "../../middleware/gym/gym.middleware"
const router = Router()

const controller = new BouldersController()

router.get('/', catchAsync(controller.getBoulders)) // gets all boulders

router.post('/', validateBoulderInput, catchAsync(controller.addBoulder))

router.get('/:boulderId', catchAsync(controller.getBoulder) as RequestHandler) // gets one boulder

router.patch('/:boulderId', validateBoulderUpdateInput, catchAsync(controller.updateBoulder)) // updates one boulder

router.delete('/:boulderId', catchAsync(controller.deleteBoulder)) // deletes one boulder

router.post('/:boulderId/ratings', validateRating, catchAsync(controller.addRating))//add rating

router.patch('/:boulderId/grades/propose-grade', verifyGrade, catchAsync(controller.proposeGrade))//propose grade intoi array of proposed grades

router.patch('/:boulderId/grades/change-grade', verifyGrade, catchAsync(controller.changeGrade))//change the grade


export default router