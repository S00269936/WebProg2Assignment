import { Router } from 'express';
import { UserController } from '../controllers/users';
import { validate } from '../middleware/validate.middleware';
import { createUserZSchema, updateUserZSchema } from '../models/user';

const router = Router();
const userController = new UserController();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', validate(createUserZSchema), userController.createUser);
router.put('/:id', validate(updateUserZSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;