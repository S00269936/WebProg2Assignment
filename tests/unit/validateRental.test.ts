
import { createRentalZSchema } from "../../src/models/rentals";

const validRental = {
    bike: "507f1f77bcf86cd799439011",
    bikeName: "Stromer ST2",
    customerName: "John Murphy",
    contactPhone: "0871234567",
    startDate: "2026-10-15",
    endDate: "2026-10-17",
    totalPrice: 100,
    status: true,
    customerNotes: "Collect in the morning"
};

describe('Test Rental Validation', () => {

    it('should pass for valid rental data', () => {
        expect(() => createRentalZSchema.parse(
            validRental)).not.toThrow();
    });

    it('should pass without optional customer notes', () => {
        expect(() => createRentalZSchema.parse(
            { ...validRental, customerNotes: undefined })).not.toThrow();
    });

    it('should fail for a missing bike', () => {
        expect(() => createRentalZSchema.parse(
            { ...validRental, bike: undefined })).toThrow();
    });

    it('should fail for a missing customer name', () => {
        expect(() => createRentalZSchema.parse(
            { ...validRental, customerName: undefined })).toThrow();
    });

    it('should fail for an empty customer name', () => {
        expect(() => createRentalZSchema.parse(
            { ...validRental, customerName: "" })).toThrow();
    });

    it('should fail for a missing contact phone', () => {
        expect(() => createRentalZSchema.parse(
            { ...validRental, contactPhone: undefined })).toThrow();
    });

    it('should fail for an invalid total price', () => {
        expect(() => createRentalZSchema.parse(
            { ...validRental, totalPrice: "one hundred" })).toThrow();
    });

    it('should fail for an invalid status', () => {
        expect(() => createRentalZSchema.parse(
            { ...validRental, status: "confirmed" })).toThrow();
    });

});
