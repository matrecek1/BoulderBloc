import { Router, RequestHandler } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { BouldersController } from "../../controller/gym/boulders.controller"
const router = Router()

const controller = new BouldersController()

router.get('/', catchAsync(controller.getBoulders)) // gets all boulders

router.post('/', catchAsync(controller.addBoulder))

router.get('/:boulderId', catchAsync(controller.getBoulder)) // gets one boulder

router.patch('/:boulderId', catchAsync(controller.updateBoulder)) // updates one boulder

router.delete('/:boulderId', catchAsync(controller.deleteBoulder)) // deletes one boulder

router.post('/:boulderId/ratings', catchAsync(controller.addRating))//add rating

router.patch('/:boulderId/grades/propose-grade', catchAsync(controller.proposeGrade))//propose grade intoi array of proposed grades

router.patch('/:boulderId/grades/change-grade', catchAsync(controller.changeGrade))//change the grade


export default router