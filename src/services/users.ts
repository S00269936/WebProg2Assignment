import { UserModel, IUser } from '../models/user';
import { HydratedDocument } from 'mongoose';
import { hash } from 'bcryptjs';

export class UserService {

  async getAllUsers(): Promise<IUser[]> {
    return await UserModel.find().lean();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id).lean();
  }

  async createUser(userData: IUser): Promise<HydratedDocument<IUser>> {
    userData.password = await hash(userData.password, 12); //hashes password using bcryptjs
    userData.role = 'customer'; //defaults to customer role

    const user = new UserModel(userData);
    return await user.save();
}

  async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    const { password, role, ...safeData } = userData;
    return await UserModel.findByIdAndUpdate(id, safeData, { returnDocument: 'after', runValidators: true }).select('-password').lean();
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return await UserModel.findByIdAndDelete(id).select('-password').lean();
  }
}