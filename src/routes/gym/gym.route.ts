import { Router, RequestHandler } from "express"
import {GymController} from "../../controller/gym/gym.controller"
import { validateGymInput, validateGymUpdateInput, validateRating, getGymById } from "../../middleware/gym/gym.middleware"
import { catchAsync } from "../../utils/catchAsync"

const router = Router()
const controller = new GymController()


//GYMS
router.get('/',catchAsync(controller.getGyms)) //gets all gyms

router.post('/', validateGymInput, catchAsync(controller.addGym))// creates new gym

router.get('/:gymId', getGymById,catchAsync(controller.getGym))//gets one gym

router.patch('/:gymId',catchAsync(controller.updateGym) )//update one gym

router.delete('/:gymId', catchAsync(controller.deleteGym))// deletes one gym

router.patch('/:gymId/ratings',validateRating, getGymById, catchAsync(controller.addRating))//add Rating


// router.get('/', catchAsync(controller.getBoulders)) // gets all boulders

// router.post('/', validateBoulderInput, catchAsync(controller.addBoulder))

// router.get('/:boulderId', catchAsync(controller.getBoulder) as RequestHandler) // gets one boulder

// router.patch('/:boulderId', validateBoulderUpdateInput, catchAsync(controller.updateBoulder)) // updates one boulder

// router.delete('/:boulderId', catchAsync(controller.deleteBoulder)) // deletes one boulder

// router.post('/:boulderId/ratings', verifyRating, catchAsync(controller.addRating))//add rating

// router.patch('/:boulderId/grades/propose-grade', verifyGrade, catchAsync(controller.proposeGrade))//propose grade intoi array of proposed grades

// router.patch('/:boulderId/grades/change-grade', verifyGrade, catchAsync(controller.changeGrade))//change the grade

export default router

