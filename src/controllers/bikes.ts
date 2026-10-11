import { Request, Response } from 'express';
import { BikeService } from '../services/bikes';
import { createBikeZSchema, updateBikeZSchema } from '../models/bike';

const bikeService = new BikeService();

export class BikeController {

  getBikes = async (_req: Request, res: Response): Promise<void> => {
     /**
     * @openapi
     * /bikes:
     *   get:
     *     summary: Retrieve all bikes
     *     tags:
     *       - Bikes
     *     responses:
     *       200:
     *         description: Successfully retrieved bikes
     *       500:
     *         description: Internal server error
     */
    try {
      const bikes = await bikeService.getAllBikes();
      res.status(200).json(bikes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bikes', error });
    }
  };
  

  getBikeById = async (req: Request, res: Response): Promise<void> => {
    /**
     * @openapi
     * /bikes/{id}:
     *   get:
     *     summary: Get a bike by ID
     *     tags:
     *       - Bikes
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: MongoDB ID of the bike
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Bike found
     *       404:
     *         description: Bike not found
     *       500:
     *         description: Internal server error
     */
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const bike = await bikeService.getBikeById(id);
      if (!bike) {
        res.status(404).json({ message: 'Bike not found' });
        return;
      }
      res.status(200).json(bike);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bike', error });
    }
  };

  createBike = async (req: Request, res: Response): Promise<void> => {
         /**
       * @openapi
       * /bikes:
       *   post:
       *     summary: Create a new bike
       *     tags:
       *       - Bikes
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/CreateBikeInput'
       *     responses:
       *       201:
       *         description: Successfully created bike
       *       400:
       *         description: Bad request
       *       500:
       *         description: Internal server error
       */
    try {
      const validation = createBikeZSchema.safeParse(req.body);
      console.log;
      if (!validation.success){
        res.status(400).json({message: 'Invalid bike data', errors:
          validation.error.issues
        });
        return;
      }
      const newBike = await bikeService.createBike(req.body);
      res.status(201).json(newBike);
    } catch (error) {
      res.status(500).json({ message: 'Error inserting into MongoDB', error });
    }
  };

  updateBike = async (req: Request, res: Response): Promise<void> => {
      /**
   * @openapi
   * /bikes/{id}:
   *   put:
   *     summary: Update an existing bike
   *     tags:
   *       - Bikes
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateBikeInput'
   *     responses:
   *       200:
   *         description: Bike updated successfully
   *       400:
   *         description: Invalid bike data
   *       404:
   *         description: Bike not found
   *       500:
   *         description: Internal server error
   */
    try {
      const validation = updateBikeZSchema.safeParse(req.body);
      console.log;
      if (!validation.success){
        res.status(400).json({message: 'Invalid bike data', errors:
          validation.error.issues
        });
      }
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updatedBike = await bikeService.updateBike(id, req.body);
      if (!updatedBike) {
        res.status(404).json({ message: 'Bike not found' });
        return;
      }
      res.status(200).json(updatedBike);
    } catch (error) {
      res.status(500).json({ message: 'Error updating bike', error });
    }
  };

  deleteBike = async (_req: Request, res: Response): Promise<void> => {
          /**
    * @openapi
    * /bikes/{id}:
    *   delete:
    *     summary: Delete a bike by ID
    *     tags:
    *       - Bikes
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         schema:
    *           type: string
    *     responses:
    *       200:
    *         description: Bike found
    *       404:
    *         description: Bike not found
    *       500:
    *         description: Internal server error
    */
    try {
      const id = Array.isArray(_req.params.id) ? _req.params.id[0] : _req.params.id;
      const deletedBike = await bikeService.deleteBike(id);
      if (!deletedBike) {
        res.status(404).json({ message: 'Bike not found' });
        return;
      }
      res.status(200).json({ message: 'Bike deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting bike', error });
    }
  };
  }