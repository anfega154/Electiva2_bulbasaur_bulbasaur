const AuthController = require('../../../../src/v1/Auth/Controllers/AuthController');
const AuthService = require('../../../../src/v1/Auth/Services/AuthService');
const HttpStatus = require('../../../../src/Utils/helpers/Httpstatus');
const jwt = require('jsonwebtoken');

jest.mock('../../../../src/v1/Auth/Services/AuthService');
jest.mock('../../../../src/Utils/helpers/Httpstatus', () => ({
  OK: 200,
  BAD_REQUEST: 400,
}));
jest.mock('jsonwebtoken');

describe('AuthController.js', () => {
  let authController, req, res;

  beforeEach(() => {
    authController = new AuthController();
    req = {
      body: { email: 'testuser@test.com', password: 'password123' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      t: jest.fn().mockReturnValue('Login successful')
    };
  });

  describe('with success response with token on successful login', () => {
    test('should return success response with token on successful login', async () => {
      const mockUser = { id: 1, email: 'testuser@test.com' };
      AuthService.login.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('mocked-jwt-token');

      await authController.login(req, res);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Login successful',
        body: { token: 'mocked-jwt-token' }
      });
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: mockUser.id, email: mockUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
    });
  });

  describe('with error response on login failure', () => {
    test('should return error response on login failure', async () => {
        const mockError = new Error('Invalid credentials');
      AuthService.login.mockRejectedValue(mockError);

      await authController.login(req, res);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    });
  });
});