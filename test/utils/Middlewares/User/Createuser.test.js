const { createUsermiddleware } = require('../../../../src/Utils/Middlewares/User/Createuser');
const HttpStatus = require('../../../../src/Utils/helpers/Httpstatus');
const httpMocks = require('node-mocks-http');
const { validationResult } = require('express-validator');

jest.mock('express-validator', () => ({
    ...jest.requireActual('express-validator'),
    validationResult: jest.fn()
}));

describe('Createuser.js', () => {
    const next = jest.fn();

    const createMocks = (body = {}) => {
        const request = httpMocks.createRequest({
            body: body
        });
        request.t = jest.fn().mockImplementation((key) => {
            const messages = {
                'messages.missing_data_to_fill': 'missing data to fill',
                'messages.The_email_format_is_not_valid': 'The email format is not valid'
            };
            return messages[key] || key;
        });
        const response = httpMocks.createResponse();
        return { request, response };
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('with name missing', () => {
        test('should return 400 if name is missing', async () => {
            const { request, response } = createMocks({ email: 'test@example.com', username: 'testuser', password: 'testpassword' });

            validationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'missing data to fill' }]
            });

            for (let middleware of createUsermiddleware) {
                await middleware(request, response, next);
            }

            const responseData = JSON.parse(response._getData());

            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
            expect(responseData.message).toContain('missing data to fill');
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('with email missing', () => {
        test('should return 400 if email is missing', async () => {
            const { request, response } = createMocks({ name: 'testname', username: 'testuser', password: 'testpassword' });

            validationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'missing data to fill' }]
            });

            for (let middleware of createUsermiddleware) {
                await middleware(request, response, next);
            }

            const responseData = JSON.parse(response._getData());

            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
            expect(responseData.message).toContain('missing data to fill');
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('with invalid email format', () => {
        test('should return 400 if email format is invalid', async () => {
            const { request, response } = createMocks({ name: 'testname', email: 'invalidemail', username: 'testuser', password: 'testpassword' });

            validationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'The email format is not valid' }]
            });

            for (let middleware of createUsermiddleware) {
                await middleware(request, response, next);
            }

            const responseData = JSON.parse(response._getData());

            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
            expect(responseData.message).toContain('The email format is not valid');
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('with username missing', () => {
        test('should return 400 if username is missing', async () => {
            const { request, response } = createMocks({ name: 'testname', email: 'test@example.com', password: 'testpassword' });

            validationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'missing data to fill' }]
            });

            for (let middleware of createUsermiddleware) {
                await middleware(request, response, next);
            }

            const responseData = JSON.parse(response._getData());

            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
            expect(responseData.message).toContain('missing data to fill');
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('with password missing', () => {
        test('should return 400 if password is missing', async () => {
            const { request, response } = createMocks({ name: 'testname', email: 'test@example.com', username: 'testuser' });

            validationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'missing data to fill' }]
            });

            for (let middleware of createUsermiddleware) {
                await middleware(request, response, next);
            }

            const responseData = JSON.parse(response._getData());

            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
            expect(responseData.message).toContain('missing data to fill');
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('with all valid data', () => {
        test('should return all data is valid', async () => {
            const { request, response } = createMocks({ name: 'testnme', email: 'test@example.com', username: 'testuser', password: 'testpassword' });

            validationResult.mockReturnValue({
                isEmpty: () => true,
                array: () => [{msg: 'User created successfully'}]
            });

            for (let middleware of createUsermiddleware) {
                await middleware(request, response, next);
            }

            expect(next).toHaveBeenCalled();
            expect(response.statusCode).toBe(HttpStatus.OK);
            expect(response._getData()).toEqual({"message":"User created successfully"});
        });
    });
});