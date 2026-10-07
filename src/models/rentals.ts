import { Schema, model } from 'mongoose';
import { string, z } from 'zod';

//Rentals: bike, customer name, contact phone, start date, end date (or time), total price, status and customer notes.
export interface IRental {
    bikeName: string;
    customerName: string;
    contactPhone: string;
    startDate: Date;
    endDate: Date;
    endTime?: string;
    totalPrice: number;
    status: string;
    customerNotes?: string;
}

