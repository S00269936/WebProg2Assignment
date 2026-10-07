import { Request, Response } from 'express';

const bikeService = new BikeService();

export class BikeController {

  getBikes = async (_req: Request, res: Response): Promise<void> => {
    try {
      const cars = await bikeService.getAllCars();
      res.status(200).json(cars);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cars', error });
    }
  };
  }
}
