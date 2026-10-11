import { Request, Response } from 'express';
import { RentalService } from '../services/rentals';
import { createRentalZSchema, updateRentalZSchema } from '../models/rentals';

const rentalService = new RentalService();

export class RentalController {

  getRentals = async (_req: Request, res: Response): Promise<void> => {
  /**
   * @openapi
   * /rentals:
   *   get:
   *     summary: Get all rentals
   *     tags:
   *       - Rentals
   *     responses:
   *       200:
   *         description: Rentals retrieved successfully
   *       500:
   *         description: Internal server error
   */
    try {
      const rentals = await rentalService.getAllRentals();
      res.status(200).json(rentals);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching rentals', error });
    }
  };
  

  getRentalById = async (req: Request, res: Response): Promise<void> => {
    /**
     * @openapi
     * /rentals/{id}:
     *   get:
     *     summary: Get a rental by ID
     *     tags:
     *       - Rentals
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Rental found
     *       404:
     *         description: Rental not found
     *       500:
     *         description: Internal server error
     */
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
    /**
     * @openapi
     * /rentals:
     *   post:
     *     summary: Create a new rental
     *     tags:
     *       - Rentals
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateRentalInput'
     *     responses:
     *       201:
     *         description: Rental created successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
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
    /**
     * @openapi
     * /rentals/{id}:
     *   put:
     *     summary: Update an existing rental
     *     tags:
     *       - Rentals
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
     *             $ref: '#/components/schemas/CreateRentalInput'
     *     responses:
     *       200:
     *         description: Rental updated successfully
     *       400:
     *         description: Invalid rental data
     *       404:
     *         description: Rental not found
     *       500:
     *         description: Internal server error
     */
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
    /**
     * @openapi
     * /rentals/{id}:
     *   delete:
     *     summary: Delete a rental
     *     tags:
     *       - Rentals
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Rental deleted successfully
     *       404:
     *         description: Rental not found
     *       500:
     *         description: Internal server error
     */
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