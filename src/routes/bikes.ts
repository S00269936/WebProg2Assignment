import { Router } from 'express'; 
import { BikeController } from '../controllers/bikes'; 
//import { authenticateKey } from '../middleware/auth.middleware';
import {validate} from '../middleware/validate.middleware';
import {createBikeZSchema}  from '../models/bike';

export const bikeRoutes = Router();  

const bikeController = new BikeController(); 

bikeRoutes.get('/', bikeController.getBikes); 

bikeRoutes.get('/:id', bikeController.getBikeById); 

bikeRoutes.post('/', validate(createBikeZSchema), bikeController.createBike);

bikeRoutes.put('/:id', bikeController.updateBike); 

bikeRoutes.delete('/:id', bikeController.deleteBike); 

 

export default bikeRoutes;