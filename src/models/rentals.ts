import { Schema, Types, model } from 'mongoose';
import { boolean, string, z } from 'zod';

//Rentals: bike, customer name, contact phone, start date, end date (or time), total price, status and customer notes.
export interface IRental {
    bike: Types.ObjectId; // Stores the MongoDB ID of the bike linked to this bike rental
    bikeName: string;
    customerName: string;
    contactPhone: string;
    startDate: Date;
    endDate: Date;
    endTime?: string;
    totalPrice: number;
    status: boolean;
    customerNotes?: string;
}


const rentalSchema = new Schema<IRental>({
    bike: {type: Schema.Types.ObjectId, ref: 'Bike', required: true}, 
    //Schema.Types.ObjectId, stores the ID of another donucment, linking the rentals to the bikes
    //ref:'Bike', refers to the Bike Model
    bikeName : {type: String, required: true},
    customerName: {type: String, required: true},
    contactPhone: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    endTime: {type: Date, required: false},
    totalPrice: {type: Number, required: true},
    status: {type: Boolean, required: true},
    customerNotes: {type: String, required: false}
});