import { Request, Response } from 'express';
import { BikeService } from '../services/bikes';

const bikeService = new BikeService();

export class BikeController {

  getBikes = async (_req: Request, res: Response): Promise<void> => {
    try {
      const cars = await bikeService.getAllBikes();
      res.status(200).json(cars);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cars', error });
    }
  };
  }