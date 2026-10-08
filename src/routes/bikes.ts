import { Router } from 'express'; 
import { BikeController } from '../controllers/bikes'; 
//import { authenticateKey } from '../middleware/auth.middleware';
import {validate} from '../middleware/validate.middleware';
import {createBikeZSchema}  from '../models/bike';

const router = Router();  

const bikeController = new BikeController(); 

router.get('/', bikeController.getBikes); 

router.get('/:id', bikeController.getBikeById); 

router.post('/', validate(createBikeZSchema), bikeController.createBike);

router.put('/:id', bikeController.updateBike); 

router.delete('/:id', bikeController.deleteBike); 

 

export default router;