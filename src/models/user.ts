import { Schema, model } from 'mongoose';
import { email, z } from 'zod';

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: 'customer' | 'staff';
}

const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type:String, required: true},
    role: {type: String, enum: ['customer', 'staff'], default: 'customer'}
})

export const createUserZSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(6),
    role: z.enum(['customer', 'staff']).optional()
});

export const UserModel = model<IUser>('User', userSchema);