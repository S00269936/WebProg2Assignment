import { createBikeZSchema } from "../../src/models/bike";
//to run: npx vitest run
const validBike = {
    bikeName: "Stromer ST2",
    type: "electric",
    pricePerHour: 10,
    pricePerDay: 50,
    available: true,
    description: "Electric bike for daily rental",
    colour: "Black",
    brand: "Stromer"
};

describe('Test Bike Validation', () => {

    it('should pass for valid bike data', () => {
        expect(() => createBikeZSchema.parse(
            validBike)).not.toThrow();
    });

    it('should pass without optional fields', () => {
        expect(() => createBikeZSchema.parse({
            bikeName: "Mountain Bike",
            type: "mountain"
        })).not.toThrow();
    });

    it('should fail for a missing bike name', () => {
        expect(() => createBikeZSchema.parse(
            { ...validBike, bikeName: undefined })).toThrow();
    });

    it('should fail for an empty bike name', () => {
        expect(() => createBikeZSchema.parse(
            { ...validBike, bikeName: "" })).toThrow();
    });

    it('should fail for a missing bike type', () => {
        expect(() => createBikeZSchema.parse(
            { ...validBike, type: undefined })).toThrow();
    });

    it('should fail for an empty bike type', () => {
        expect(() => createBikeZSchema.parse(
            { ...validBike, type: "" })).toThrow();
    });

    it('should fail for a price per hour below 1', () => {
        expect(() => createBikeZSchema.parse(
            { ...validBike, pricePerHour: 0 })).toThrow();
    });

    it('should fail for a price per day below 1', () => {
        expect(() => createBikeZSchema.parse(
            { ...validBike, pricePerDay: -5 })).toThrow();
    });

    it('should fail for an invalid price type', () => {
        expect(() => createBikeZSchema.parse(
            { ...validBike, pricePerHour: "ten" })).toThrow();
    });

    it('should fail for an invalid availability value', () => {
        expect(() => createBikeZSchema.parse(
            { ...validBike, available: "yes" })).toThrow();
    });

});
