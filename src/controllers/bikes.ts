import { Request, Response } from 'express';

export class BikeController {

  getCars = async (_req: Request, res: Response): Promise<void> => {

    res.status(200).json({ success: true, 
      data: "this is just dummy for now a response to the get all bikes request" });
  };


  getCarById = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ success: true, 
      data: `this is just dummy for now a response to the get bike by id request with bike id ${req.params.id}` });
  };

  createCar = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ success: true, 
      data: `this is just dummy for now a response to the create bike request the data received in the request body is: ${JSON.stringify(req.body)}` });
  };

  updateCar = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ success: true, 
      data: `this is just dummy for now a response to the update bike by id request with bike id ${req.params.id}` }); 
  };

  deleteCar = async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({ success: true, 
      data: `this is just dummy for now a response to the delete bike by id request with bike id ${_req.params.id}` }); 
  };
}
