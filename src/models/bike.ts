import { Schema, model } from 'mongoose';
import { z } from 'zod';

export interface IBike{
    name: string;
    type: string;
    price: number;
    color?: string;
    brand?: string;
}

const bikeSchema = new Schema<IBike>({
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number },
    color: { type: String },
    brand: { type: String },
},{ timestamps: true });


export const BikeModel = model<IBike>('Bike', bikeSchema);
