import { Request, Response } from 'express';
import { RentalService } from '../services/rentals';
import { createRentalZSchema, updateRentalZSchema } from '../models/rentals';

const rentalService = new RentalService();

export class RentalController {

  getRentals = async (_req: Request, res: Response): Promise<void> => {
    try {
      const rentals = await rentalService.getAllRentals();
      res.status(200).json(rentals);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching rentals', error });
    }
  };
  

  getRentalById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const rental = await rentalService.getRentalById(id);
      if (!rental) {
        res.status(404).json({ message: 'Rental not found' });
        return;
      }
      res.status(200).json(rental);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching rental', error });
    }
  };

  createRental = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = createRentalZSchema.safeParse(req.body);
      console.log;
      if (!validation.success){
        res.status(400).json({message: 'Invalid rental data', errors:
          validation.error.issues
        });
        return;
      }
      const newRental = await rentalService.createRental(req.body);
      res.status(201).json(newRental);
    } catch (error) {
      res.status(500).json({ message: 'Error inserting into MongoDB', error });
    }
  };

  updateRental = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = updateRentalZSchema.safeParse(req.body);
      console.log;
      if (!validation.success){
        res.status(400).json({message: 'Invalid rental data', errors:
          validation.error.issues
        });
      }
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updatedRental = await rentalService.updateRental(id, req.body);
      if (!updatedRental) {
        res.status(404).json({ message: 'Rental not found' });
        return;
      }
      res.status(200).json(updatedRental);
    } catch (error) {
      res.status(500).json({ message: 'Error updating rental', error });
    }
  };

  deleteRental = async (_req: Request, res: Response): Promise<void> => {
    try {
      const id = Array.isArray(_req.params.id) ? _req.params.id[0] : _req.params.id;
      const deletedRental = await rentalService.deleteRental(id);
      if (!deletedRental) {
        res.status(404).json({ message: 'Rental not found' });
        return;
      }
      res.status(200).json({ message: 'Rental deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting rental', error });
    }
  };
  }