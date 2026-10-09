import { Request, Response } from 'express';
import { UserService } from '../services/users';
import { createUserZSchema } from '../models/user';

const userService = new UserService();

export class UserController {

  getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
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
