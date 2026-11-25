import { BikeModel, IBike } from '../models/bike'
import { HydratedDocument } from 'mongoose';

export class BikeService {



  async getAllBikes(): Promise<IBike[]> {
    return await BikeModel.find().lean(); 
  }

  async getBikeById(id: string): Promise<IBike | null> {
    return await BikeModel.findById(id).lean();
  }

  async createBike(bikeData: IBike): Promise<HydratedDocument<IBike>> {
    const bike = new BikeModel(bikeData);
    return await bike.save();
  }

  async updateBike(id: string, bikeData: Partial<IBike>): Promise<IBike | null> {
    return await BikeModel.findByIdAndUpdate(id, bikeData, { returnDocument: 'after' }).lean();
  }

  async deleteBike(id: string): Promise<IBike | null> {
    return await BikeModel.findByIdAndDelete(id).lean();
  }
}
