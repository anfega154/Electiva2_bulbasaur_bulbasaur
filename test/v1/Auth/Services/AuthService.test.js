const UserRepository = require('../../../../src/v1/User/Repository/UserRepository');
const bcrypt = require('bcrypt');
const { login } = require('../../../../src/v1/Auth/Services/AuthService'); 

jest.mock('../../../../src/v1/User/Repository/UserRepository', () => {
    return jest.fn().mockImplementation(() => {
      return {
        findByUsername: jest.fn()
      };
    });
  });

jest.mock('bcrypt');

describe('Login Function', () => {
  let mockUserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    UserRepository.mockClear();
    mockUserRepository = new UserRepository();
  });

  describe('with  valid credentials', () => {
    test('should successfully login with valid credentials', async () => {
        const mockUser = {
            username: 'testUser',
            password: 'hashedPassword'
        };
        const loginData = {
            username: 'testUser',
            password: 'correctPassword'
        };

        mockUserRepository.findByUsername.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);

        const result = await login(loginData);

        expect(mockUserRepository.findByUsername).toHaveBeenCalledWith(loginData.username);
        expect(bcrypt.compare).toHaveBeenCalledWith(loginData.password, mockUser.password);
        expect(result).toEqual(mockUser);
    });
  });
  
  describe('with username is invalid', () => {
    test('should throw error when username is invalid', async () => {
        const loginData = {
        username: 'nonexistentUser',
        password: 'somePassword'
        };

        mockUserRepository.findByUsername.mockResolvedValue(null);

        await expect(login(loginData)).rejects.toEqual('username or password invalid');
        expect(mockUserRepository.findByUsername).toHaveBeenCalledWith(loginData.username);
        expect(bcrypt.compare).not.toHaveBeenCalled();
    });   
  });
  
  describe('with  password is invalid', () => {
    test('should throw error when password is invalid', async () => {
        const mockUser = {
        username: 'testUser',
        password: 'hashedPassword'
        };
        const loginData = {
        username: 'testUser',
        password: 'wrongPassword'
        };

        mockUserRepository.findByUsername.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(false);

        await expect(login(loginData)).rejects.toEqual('username or password invalid');
        expect(mockUserRepository.findByUsername).toHaveBeenCalledWith(loginData.username);
        expect(bcrypt.compare).toHaveBeenCalledWith(loginData.password, mockUser.password);
    });
  });
  
});