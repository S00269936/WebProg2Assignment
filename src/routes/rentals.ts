import { Router } from 'express'; 
import { RentalController } from '../controllers/rentals';
//import { authenticateKey } from '../middleware/auth.middleware';
import {validate} from '../middleware/validate.middleware';
import {createRentalZSchema}  from '../models/rentals';

const router = Router();  

const rentalController = new RentalController(); 

router.get('/', rentalController.getRentals); 

router.get('/:id', rentalController.getRentalById); 

router.post('/', validate(createRentalZSchema), rentalController.createRental);

router.put('/:id', rentalController.updateRental); 

router.delete('/:id', rentalController.deleteRental); 

 

export default router;