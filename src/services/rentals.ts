
import { RentalModel, IRental } from '../models/rentals';
import { HydratedDocument } from 'mongoose';

export class RentalService {

    async getAllRentals(): Promise<IRental[]> {
        return await RentalModel.find().lean();
    }

    async getRentalById(id: string): Promise<IRental | null> {
        return await RentalModel.findById(id).lean();
    }

    async createRental(rentalData: IRental): Promise<HydratedDocument<IRental>> {
        const rental = new RentalModel(rentalData);
        return await rental.save();
    }

    async updateRental(id: string, rentalData: Partial<IRental>): Promise<IRental | null> {
        return await RentalModel.findByIdAndUpdate(id, rentalData, { returnDocument: 'after', runValidators: true }).lean();
    }

    async deleteRental(id: string): Promise<IRental | null> {
        return await RentalModel.findByIdAndDelete(id).lean();
    }
}
