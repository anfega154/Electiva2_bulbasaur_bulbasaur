// loginMiddleware.test.js
const { validationResult } = require('express-validator');
const HttpStatus = require('../../../../src/Utils/helpers/Httpstatus');
const {loginMiddleware} = require('../../../../src/Utils/Middlewares/Auth/Login');
const httpMocks = require('node-mocks-http');


describe('loginMiddleware.js', () => {

        const request = httpMocks.createRequest();
        const response = httpMocks.createResponse();
        const next = jest.fn();
        request.t = jest.fn().mockImplementation((key) => {
            const messages = {
                'messages.followerid_must_be_numeric': 'followerid must be numeric',
                'messages.missing_data_to_fill': 'missing data to fill',
                'messages.the_password_must_be_a_string': 'the password must be a string'
            };
            return messages[key] || key;
        });
        
    describe('with username is missing', () => { 
        test('should return 400 if username is missing', async () => {
            request.body = { password: 'testpassword' };
            
            for (let middleware of loginMiddleware) {
                await middleware(request, response, next);
              };
               const responseData = JSON.parse( response._getData()); 
        
               expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
               const messages = responseData.message.split(', ');
               expect(messages).toContain('missing data to fill');
               //expect(next).not.toHaveBeenCalled();            
        });
    });

    describe('with password is missing', () => { 
        test('should return 400 if password is missing', async () => {
            request.body = { username: 'testuser' };

            for (let middleware of loginMiddleware) {
                await middleware(request, response, next);
              };
               const responseData = JSON.parse( response._getData()); 
        
               expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
               const messages = responseData.message.split(', ');
               expect(messages).toContain('missing data to fill');
               //expect(next).not.toHaveBeenCalled();            
        });
    });
    
    describe('with password is not string', () => { 
        test('should return 400 if password is not a string', async () => {
            request.body = { username: 'testuser', password: 12345 };
            
            for (let middleware of loginMiddleware) {
                await middleware(request, response, next);
              };
               const responseData = JSON.parse( response._getData()); 
        
               expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
               const messages = responseData.message.split(', ');
               expect(messages).toContain('the password must be a string');
              expect(next).not.toHaveBeenCalled();                        
        });
    });

    describe('with username and password are valid', () => { 
        test('should call next if username and password are valid', async () => {
            //request.body = { username: 'testuser', password: 'testpassword' };
            const mockLogin={ username: 'testuser', password: 'testpassword' }; 
            
            const response= httpMocks.createResponse();
            const request= httpMocks.createRequest({
                body:{ ...mockLogin}
            })

            

            for (let middleware of loginMiddleware) {
                await middleware(request, response, next);
              };
               const responseData =  response._getData(); 
        
               expect(response.statusCode).toBe(200);
               expect(responseData).toEqual("{\"message\":\"Login is correct\"}");
              expect(next).not.toHaveBeenCalled();
        });
    });
});

