const { validationResult } = require('express-validator');
const HttpStatus = require('../../../../src/Utils/helpers/Httpstatus');
const { loginMiddleware } = require('../../../../src/Utils/Middlewares/Auth/Login');
const httpMocks = require('node-mocks-http');

describe('loginMiddleware.js', () => {
    const next = jest.fn();
    
    const createMocks = (body = {}) => {
        const request = httpMocks.createRequest({
            body: body
        });
        request.t = jest.fn().mockImplementation((key) => {
            const messages = {
                'messages.followerid_must_be_numeric': 'followerid must be numeric',
                'messages.missing_data_to_fill': 'missing data to fill',
                'messages.the_password_must_be_a_string': 'the password must be a string'
            };
            return messages[key] || key;
        });
        const response = httpMocks.createResponse();
        return { request, response };
    };

    describe('with username is missing', () => {
        test('should return 400 if username is missing', async () => {
            const { request, response } = createMocks({ password: 'testpassword' });

            for (let middleware of loginMiddleware) {
                await middleware(request, response, next);
            }
            const responseData = JSON.parse(response._getData());

            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
            const messages = responseData.message.split(', ');
            expect(messages).toContain('missing data to fill');
        });
    });

    describe('with password is missing', () => {
        test('should return 400 if password is missing', async () => {
            const { request, response } = createMocks({ username: 'testuser' });

            for (let middleware of loginMiddleware) {
                await middleware(request, response, next);
            }
            const responseData = JSON.parse(response._getData());

            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
            const messages = responseData.message.split(', ');
            expect(messages).toContain('missing data to fill');
        });
    });

    describe('with password not a string', () => {
        test('should return 400 if password is not a string', async () => {
            const { request, response } = createMocks({ username: 'testuser', password: 12345 }); // Invalid password

            for (let middleware of loginMiddleware) {
                await middleware(request, response, next);
            }
            const responseData = JSON.parse(response._getData());

            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
            const messages = responseData.message.split(', ');
            expect(messages).toContain('the password must be a string');
        });
    });

    describe('with username and password are valid', () => { 
        test('should call next if username and password are valid', async () => {
            const { request, response } = createMocks({ username: 'testuser', password: 'testpassword' });

            for (let middleware of loginMiddleware) {
                await middleware(request, response, next);
            }
            const responseData = JSON.parse(response._getData()); 

            expect(response.statusCode).toBe(HttpStatus.OK);
            expect(responseData).toEqual({ message: "Login is correct" });
            expect(next).toHaveBeenCalled(); 
        });
    });
});