import { errorHandler } from '../errorHandler';

describe('errorHandler() errorHandler method', () => {

    describe('Happy Paths', () => {
        test('should respond with 500 and "Internal Server Error" when a generic error is passed', () => {
            const err = new Error('Something went wrong');
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            errorHandler(err, req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
        });

        test('should respond with 500 and "Internal Server Error" when error has a custom stack', () => {
            const err = { stack: 'Custom stack trace', message: 'Custom error' };
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            errorHandler(err, req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
        });

        test('should respond with 500 and "Internal Server Error" when req and res are empty objects', () => {
            const err = new Error('Test error');
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            errorHandler(err, req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
        });
    });

    describe('Edge Cases', () => {
        test('should respond with 500 and "Internal Server Error" when error object has no stack property', () => {
            const err = { message: 'No stack here' };
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            errorHandler(err, req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
        });

        test('should respond with 500 and "Internal Server Error" when error object is null', () => {
            const err = null;
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            errorHandler(err, req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
        });

        test('should respond with 500 and "Internal Server Error" when error object is undefined', () => {
            const err = undefined;
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            errorHandler(err, req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
        });

        test('should throw if res.status is not a function', () => {
            const err = new Error('Test error');
            const req = {};
            const res = {
                json: jest.fn()
            };
            const next = jest.fn();

            expect(() => errorHandler(err, req, res, next)).toThrow();
        });

        test('should throw if res.json is not a function', () => {
            const err = new Error('Test error');
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis()
            };
            const next = jest.fn();

            expect(() => errorHandler(err, req, res, next)).toThrow();
        });

        test('should not throw if next is undefined', () => {
            const err = new Error('Test error');
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            expect(() => errorHandler(err, req, res, undefined)).not.toThrow();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
        });
    });
});