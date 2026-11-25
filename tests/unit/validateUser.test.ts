
import { createUserZSchema } from "../../src/models/user";

const validUser = {
    name: "John Murphy",
    email: "john.murphy@gmail.com",
    password: "Password123",
    role: "customer"
};

describe('Test User Validation', () => {

    it('should pass for valid user data', () => {
        expect(() => createUserZSchema.parse(
            validUser)).not.toThrow();
    });

    it('should pass without an optional role', () => {
        expect(() => createUserZSchema.parse(
            { ...validUser, role: undefined })).not.toThrow();
    });

    it('should fail for a missing name', () => {
        expect(() => createUserZSchema.parse(
            { ...validUser, name: undefined })).toThrow();
    });

    it('should fail for an empty name', () => {
        expect(() => createUserZSchema.parse(
            { ...validUser, name: "" })).toThrow();
    });

    it('should fail for an invalid email', () => {
        expect(() => createUserZSchema.parse(
            { ...validUser, email: "notanemail" })).toThrow();
    });

    it('should fail for a missing email', () => {
        expect(() => createUserZSchema.parse(
            { ...validUser, email: undefined })).toThrow();
    });

    it('should fail for a password shorter than 6 characters', () => {
        expect(() => createUserZSchema.parse(
            { ...validUser, password: "123" })).toThrow();
    });

    it('should fail for a missing password', () => {
        expect(() => createUserZSchema.parse(
            { ...validUser, password: undefined })).toThrow();
    });

    it('should fail for an invalid role', () => {
        expect(() => createUserZSchema.parse(
            { ...validUser, role: "admin" })).toThrow();
    });

});
