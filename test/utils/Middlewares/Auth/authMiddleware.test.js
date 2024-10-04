const jwt = require('jsonwebtoken');
const HttpStatus = require('../../../../src/Utils/helpers/Httpstatus');
const authMiddleware = require('../../../../src/Utils/Middlewares/Auth/AuthMiddleware');
const httpMocks = require('node-mocks-http');

jest.mock('jsonwebtoken');

describe('authMiddleware.js', () => {
    
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const next = jest.fn();
    describe('with token not delivered valid', () => {   
        test('should return 401 if no token is delivered', async () => {
            authMiddleware(request, response, next);

            const responseData = response._getData();
            expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
            expect(responseData).toEqual({ message: 'Token not delivered' });
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('with token is valid', () => {  
        test('should call next if token is valid', () => {
            const mockToken = 'valid.token';
            const mockDecoded = { userId: 1 };

            request.headers['authorization'] = `Bearer ${mockToken}`;
            process.env.JWT_SECRET = 'your_jwt_secret'; 

            jwt.verify.mockReturnValue(mockDecoded);
            authMiddleware(request, response, next);

            expect(request.user).toEqual(mockDecoded);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('with token not valid', () => {      
        test('should return 403 if token is invalid', async () => {
            const mockToken = 'invalid.token';
            
            request.headers['authorization'] = `Bearer ${mockToken}`;
            process.env.JWT_SECRET = 'your_jwt_secret';

            jwt.verify.mockImplementation(() => {
                throw new Error('Invalid token');
            });

            authMiddleware(request, response, next);

            const responseData = response._getData();
            expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
            expect(responseData).toEqual({ message: 'Invalid or expired token' });
            expect(next).not.toHaveBeenCalled();
        });
    });
});
