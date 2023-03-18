import { Router} from "express"
import { catchAsync } from "../../utils/catchAsync"
import { BouldersController } from "../../controller/gym/boulders.controller"
import { getBoulderById, processImage,validateBoulderInput, validateBoulderUpdateInput, verifyGrade} from "../../middleware/gym/boulders.middleware"
import { getGymById,validateRating } from "../../middleware/gym/gym.middleware"
import { getWallById } from "../../middleware/gym/wall.middleware"
import multer from "multer"
const router = Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })
const controller = new BouldersController()

router.get('/:gymId/walls/:wallId/boulders', getGymById, getWallById,catchAsync(controller.getBoulders))

router.post('/:gymId/walls/:wallId/boulders', upload.single('image'),processImage,validateBoulderInput, getGymById, getWallById, catchAsync(controller.addBoulder))

router.delete('/:gymId/walls/:wallId/boulders', getGymById, getWallById, catchAsync(controller.deleteAllBoulders))

router.get('/:gymId/walls/:wallId/boulders/:boulderId', getGymById, getWallById, getBoulderById, catchAsync(controller.getBoulder)) // gets one boulder

router.patch('/:gymId/walls/:wallId/boulders/:boulderId', validateBoulderUpdateInput, getGymById, getWallById, getBoulderById, catchAsync(controller.updateBoulder)) // updates one boulder

router.delete('/:gymId/walls/:wallId/boulders/:boulderId', getGymById, getWallById, catchAsync(controller.deleteBoulder)) // deletes one boulder

router.post('/:gymId/walls/:wallId/boulders/:boulderId/ratings', validateRating, getGymById, getWallById, getBoulderById, catchAsync(controller.addRating))//add rating

router.patch('/:gymId/walls/:wallId/boulders/:boulderId/grades', verifyGrade, getGymById, getWallById, getBoulderById, catchAsync(controller.proposeGrade))//propose grade intoi array of proposed grades


export default router