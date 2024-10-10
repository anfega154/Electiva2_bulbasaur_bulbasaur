const UserRepository = require('../../../src/v1/User/Repository/UserRepository');
const RepositoryBase = require('../../../src/infrastucture/database/Repository');
const User = require('../../../src/v1/User/Models/User');
const Follower = require('../../../src/v1/Follow/Models/Follower');
const { Op } = require('sequelize');

// Mocks
jest.mock('../../../src/infrastucture/database/Repository');
jest.mock('../../../src/v1/User/Models/User');
jest.mock('../../../src/v1/Follow/Models/Follower');

describe('UserRepository.js', () => {
    let userRepository;

    beforeEach(() => {
        mockUser = {
          id: 1,
          username: 'testuser',
          email: 'test@test.com',
          update: jest.fn(),
          destroy: jest.fn()
        };
        RepositoryBase.mockImplementation(() => {
            return {
                model: User
            };
            });
        jest.clearAllMocks();
        userRepository = new UserRepository();
    });

    describe('getAll', () => {
        test('should return all users', async () => {
            const mockUsers = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
            User.findAll.mockResolvedValue(mockUsers);

            const result = await userRepository.getAll();

            expect(User.findAll).toHaveBeenCalled();
            expect(result).toEqual(mockUsers);
        });
    });

    describe('getById', () => {
        describe('with user by ID', () => {
            test('should return a user by ID', async () => {
                //const mockUser = { id: 1, username: 'user1' };
                User.findByPk.mockResolvedValue(mockUser); 

                const result = await userRepository.getById(1);

                expect(User.findByPk).toHaveBeenCalledWith(1);
                expect(result).toEqual(mockUser);
            });          
        });
        
        describe('with user not found', () => {
            test('should throw an error if user not found', async () => {
                User.findByPk.mockResolvedValue(null);

                const result = await userRepository.getById(999);
      
                expect(User.findByPk).toHaveBeenCalledWith(999);
                expect(result).toBeNull();
            });         
        });
    });

    describe('create', () => {
        test('should create a new user', async () => {
            const mockData = { username: 'newuser', email: 'newuser@example.com' };
            const mockUsers = { id: 1, ...mockData };
            User.create.mockResolvedValue(mockUsers);

            const result = await userRepository.create(mockData);

            expect(User.create).toHaveBeenCalledWith(mockData);
            expect(result).toEqual(mockUser);
        });
    });

    describe('update', () => {
        describe('with user by ID', () => {
            test('should update a user by ID', async () => {
                const mockUser = { id: 1, username: 'user1', update: jest.fn() };
                const newData = { username: 'updatedUser' };
                User.findByPk.mockResolvedValue(mockUser);

                await userRepository.update(1, newData);

                expect(User.findByPk).toHaveBeenCalledWith(1);
                expect(mockUser.update).toHaveBeenCalledWith(newData);
            });          
        });
        
        describe('with user is not found', () => {
            test('should throw error if user is not found', async () => {
                User.findByPk.mockResolvedValue(null);

                await expect(userRepository.update(99, { username: 'updatedUser' })).rejects.toThrow('User Not Found');
            });          
        });
    });

    describe('delete', () => {
        describe('with  user by ID', () => {
            test('should delete a user by ID', async () => {
                const mockUser = { id: 1, username: 'user1', destroy: jest.fn() };
                User.findByPk.mockResolvedValue(mockUser);

                const result = await userRepository.delete(1);

                expect(User.findByPk).toHaveBeenCalledWith(1);
                expect(mockUser.destroy).toHaveBeenCalled();
                expect(result).toEqual(mockUser);
            });
        });
        
        describe('with  user is not found', () => {
            test('should throw error if user is not found', async () => {
                User.findByPk.mockResolvedValue(null);

                await expect(userRepository.delete(1)).rejects.toThrow('User Not Found');
            });
        });
    });


    describe('exist', () => {
        describe('with  user by email', () => {
            test('should find existing user by email', async () => {
                User.findOne.mockResolvedValue(mockUser);
                
                const result = await userRepository.exist('test@test.com', null);
                
                expect(User.findOne).toHaveBeenCalledWith({
                where: {
                    [Op.or]: [
                    { email: 'test@test.com' },
                    { username: null }
                    ]
                }
                });
                expect(result).toEqual(mockUser);
            });          
        });
        
        describe('with user by username, () => {', () => {
            test('should find existing user by username', async () => {
                User.findOne.mockResolvedValue(mockUser);
                
                const result = await userRepository.exist(null, 'testuser');
                
                expect(User.findOne).toHaveBeenCalledWith({
                where: {
                    [Op.or]: [
                    { email: null },
                    { username: 'testuser' }
                    ]
                }
                });
                expect(result).toEqual(mockUser);
            });          
        });     
    });

    describe('followUser', () => {
        test('should allow a user to follow another user', async () => {
            const mockFollower = { id: 1, username: 'follower' };
            const mockFollowing = { id: 2, username: 'following' };
            const mockExistingFollow = null; 

            userRepository.getById = jest.fn()
                .mockResolvedValueOnce(mockFollower) // First call for follower
                .mockResolvedValueOnce(mockFollowing); // Second call for following
            Follower.findOne.mockResolvedValue(mockExistingFollow);
            Follower.create.mockResolvedValue({ followerid: 1, followingid: 2 });

            await userRepository.followUser(1, 2);

            expect(userRepository.getById).toHaveBeenCalledWith(1);
            expect(userRepository.getById).toHaveBeenCalledWith(2);
            expect(Follower.findOne).toHaveBeenCalledWith({
                where: { followerid: 1, followingid: 2 },
            });
            expect(Follower.create).toHaveBeenCalledWith({
                followerid: 1,
                followingid: 2,
            });
        });

        test('should throw error if follower already exists', async () => {
            const mockFollower = { id: 1, username: 'follower' };
            const mockFollowing = { id: 2, username: 'following' };
            const mockExistingFollow = { followerid: 1, followingid: 2 };

            userRepository.getById = jest.fn()
                .mockResolvedValueOnce(mockFollower) 
                .mockResolvedValueOnce(mockFollowing); 
            Follower.findOne.mockResolvedValue(mockExistingFollow);

            await expect(userRepository.followUser(1, 2)).rejects.toThrow('El usuario ya sigue a este perfil.');

            expect(Follower.findOne).toHaveBeenCalledWith({
                where: { followerid: 1, followingid: 2 },
            });
        });
    });

    describe('getFollowers', () => {
        test('should return a list of followers with pagination', async () => {
            const mockFollowers = [
                { followerid: 1, followingid: 2, follower: { username: 'user1' } },
            ];
            Follower.findAll.mockResolvedValue(mockFollowers);

            const result = await userRepository.getFollowers(2, 1, 10);

            expect(Follower.findAll).toHaveBeenCalledWith({
                where: { followingid: 2 },
                include: [{ model: User, as: 'follower' }],
                limit: 10,
                offset: 0,
            });
            expect(result).toEqual(mockFollowers);
        });
    });

    describe('getFollowing', () => {
        test('should return a list of users being followed with pagination', async () => {
            const mockFollowing = [
                { followerid: 1, followingid: 2, following: { username: 'user2' } },
            ];
            Follower.findAll.mockResolvedValue(mockFollowing);

            const result = await userRepository.getFollowing(1, 1, 10);

            expect(Follower.findAll).toHaveBeenCalledWith({
                where: { followerid: 1 },
                include: [{ model: User, as: 'following' }],
                limit: 10,
                offset: 0,
            });
            expect(result).toEqual(mockFollowing);
        });
    });

    describe('getFollowerCount', () => {
        test('should return the count of followers', async () => {
            Follower.count.mockResolvedValue(5);

            const result = await userRepository.getFollowerCount(2);

            expect(Follower.count).toHaveBeenCalledWith({ where: { followingid: 2 } });
            expect(result).toBe(5);
        });
    });

    describe('getFollowingCount', () => {
        test('should return the count of following users', async () => {
            Follower.count.mockResolvedValue(3);

            const result = await userRepository.getFollowingCount(1);

            expect(Follower.count).toHaveBeenCalledWith({ where: { followerid: 1 } });
            expect(result).toBe(3);
        });
    });

    describe('findByUsername', () => {
        test('should find user by username', async () => {
            const mockUser = { id: 1, username: 'user1' };
            User.findOne.mockResolvedValue(mockUser);

            const result = await userRepository.findByUsername('user1');

            expect(User.findOne).toHaveBeenCalledWith({
                where: { username: 'user1' }
            });
            expect(result).toEqual(mockUser);
        });
    });
});
