import { Schema, model } from 'mongoose';
import { z } from 'zod';

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