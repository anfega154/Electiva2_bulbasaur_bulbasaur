// loginMiddleware.test.js
const { validationResult } = require('express-validator');
const HttpStatus = require('../../../../src/Utils/helpers/Httpstatus');
const {loginMiddleware} = require('../../../../src/Utils/Middlewares/Auth/Login');
const httpMocks = require('node-mocks-http');
/*

describe('loginMiddleware.js', () => {

        const request = httpMocks.createRequest();
        const response = httpMocks.createResponse();
        const next = jest.fn();
    describe('with username is missing', () => { 
        test('should return 400 if username is missing', async () => {
            request.body = { password: 'testpassword' };
            await runMiddleware(request, response, next, loginMiddleware);
            const responseData = response._getData();
            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
            expect(responseData).toEqual({
                status: "error",
                message: "messages.missing_data_to_fill",
            });
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('with password is missing', () => { 
        test('should return 400 if password is missing', async () => {
            request.body = { username: 'testuser' };
            await runMiddleware(request, response, next, loginMiddleware);
            const responseData = response._getData(); 
            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
            expect(responseData).toEqual({
                status: "error",
                message: "messages.missing_data_to_fill",
            });
            expect(next).not.toHaveBeenCalled();
        });
    });
    
    describe('with password is not string', () => { 
        test('should return 400 if password is not a string', async () => {
            request.body = { username: 'testuser', password: 12345 };
            await runMiddleware(request, response, next, loginMiddleware);
            const responseData = response._getData();
            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
            expect(responseData).toEqual({
                status: "error",
                message: "messages.the_password_must_be_a_string",
            });
            expect(next).not.toHaveBeenCalled();
        });
    });
    describe('with username and password are valid', () => { 
        test('should call next if username and password are valid', async () => {
            request.body = { username: 'testuser', password: 'testpassword' }; 
            await runMiddleware(request, response, next, loginMiddleware);
            expect(next).toHaveBeenCalled();
        });
    });
});

const runMiddleware = async (req, res, next, middlewares) => {
    for (const middleware of middlewares) {
      await middleware(req, res, next);
    }
  };
*/