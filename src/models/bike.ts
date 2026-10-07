import { Schema, model } from 'mongoose';
import { z } from 'zod';

export interface IBike{
    name: string;
    type: string;
    pricePerHour: number;
    pricePerDay: number;
    available: boolean;
    description?: string;
    image?: ImageBitmap; //check this AND \/
    color?: string;
    brand?: string;
}

const bikeSchema = new Schema<IBike>({
    name: { type: String, required: true },
    type: { type: String, required: true },
    pricePerHour: { type: Number },
    pricePerDay: { type: Number },
    available: { type: Boolean, default: true },
    description: { type: String },
    image: { type: Image, required: false }, //THISssss
    color: { type: String },
    brand: { type: String },
},{ timestamps: true });

export const createBikeZSchema = z.object({
    /**
   * @openapi
   * components:
   *   schemas:
   *     CreateBikeInput:
   *       type: object
   *       required:
   *         - name
   *         - type
   *       properties:
   *         name:
   *           type: string
   *           example: Stromer ST2
   *         type:
   *           type: string
   *           example: electric
   *         price:
   *           type: integer
   *           example: 3000
   */
  
  
    name: z.string().min(1),
    type: z.string().min(1),
    pricePerHour: z.number().min(1).optional(),
    pricePerDay: z.number().min(1).optional(),
    available: z.boolean().optional(),
    description: z.string().optional(),
    image: z.any().optional(),
    color: z.string().optional(),
    brand: z.string().optional(),
  })

  export const updateBikeZSchema = z.object({
    name: z.string().min(1),
    type: z.string().min(1),
    pricePerHour: z.number().min(1).optional(),
    pricePerDay: z.number().min(1).optional(),
    available: z.boolean().optional(),
    description: z.string().optional(),
    image: z.any().optional(),
    color: z.string().optional(),
    brand: z.string().optional(),
})

export const BikeModel = model<IBike>('Bike', bikeSchema);
