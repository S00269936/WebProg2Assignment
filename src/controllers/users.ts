import { Request, Response } from 'express';
import { UserService } from '../services/users';
import { createUserZSchema } from '../models/user';

const userService = new UserService();

export class UserController {

  getUsers = async (_req: Request, res: Response): Promise<void> => {
    /**
     * @openapi
     * /users:
     *   get:
     *     summary: Get all users
     *     tags:
     *       - Users
     *     responses:
     *       200:
     *         description: Users retrieved successfully
     *       500:
     *         description: Internal server error
     */
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    /**
     * @openapi
     * /users/{id}:
     *   get:
     *     summary: Get a user by ID
     *     tags:
     *       - Users
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: User found
     *       404:
     *         description: User not found
     *       500:
     *         description: Internal server error
     */
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const user = await userService.getUserById(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
    }
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    /**
     * @openapi
     * /users:
     *   post:
     *     summary: Create a new user
     *     tags:
     *       - Users
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateUserInput'
     *     responses:
     *       201:
     *         description: User created successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    try {
      const validation = createUserZSchema.safeParse(req.body);
      if (!validation.success) {
        res.status(400).json({
          message: 'Invalid user data',
          errors: validation.error.issues
        });
        return;
      }
      const user = await userService.createUser({...validation.data, role: 'customer'
      });
      //creates a new user
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    /**
     * @openapi
     * /users/{id}:
     *   put:
     *     summary: Update an existing user
     *     tags:
     *       - Users
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
     *             $ref: '#/components/schemas/CreateUserInput'
     *     responses:
     *       200:
     *         description: User updated successfully
     *       400:
     *         description: Invalid user data
     *       404:
     *         description: User not found
     *       500:
     *         description: Internal server error
     */
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const user = await userService.updateUser(id, req.body);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user' });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    /**
     * @openapi
     * /users/{id}:
     *   delete:
     *     summary: Delete a user
     *     tags:
     *       - Users
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: User deleted successfully
     *       404:
     *         description: User not found
     *       500:
     *         description: Internal server error
     */
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const user = await userService.deleteUser(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user' });
    }
  };
}
