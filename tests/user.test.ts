import { getUsers, getUserByName, signin, signup } from '../src/services/user.service';
import { UserModel } from '../src/models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


// Mocking the necessary modules
jest.mock('../src/models/user.model');
jest.mock('jsonwebtoken');
jest.mock('bcryptjs');


describe('User Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getUsers', () => {
        it('should return a list of users', async () => {
            const mockUsers = [{ id: 1, username: 'user1', email: 'user1@example.com' }];
            (UserModel.find as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUsers) });

            const result = await getUsers();
            expect(result).toEqual(mockUsers);
        });

        it('should handle errors gracefully', async () => {
            (UserModel.find as jest.Mock).mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('DB error')) });

            try {
                await getUsers();
            } catch (err) {
                if (err instanceof Error) {
                    expect(err.message).toBe('DB error');
                } else {
                    throw new Error('Unexpected error type');
                }
            }
        });
    });

    describe('getUserByName', () => {
        it('should return user id by username', async () => {
            const mockUser = { id: 1, username: 'user1' };
            (UserModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });

            const result = await getUserByName('user1');
            expect(result).toBe(mockUser.id);
        });

        it('should return undefined if user is not found', async () => {
            (UserModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

            const result = await getUserByName('user2');
            expect(result).toBeUndefined();
        });
    });

    describe('signin', () => {
        it('should return token on successful signin', async () => {
            const mockUser = { id: 1, username: 'user1', email: 'user1@example.com', password: 'hashedPassword', role: 'user' };
            (UserModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (jwt.sign as jest.Mock).mockReturnValue('token');

            const result = await signin('user1@example.com', 'password', 'user1');
            expect(result).toBe('token');
        });

        it('should return "User not found" if user does not exist', async () => {
            (UserModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

            const result = await signin('user1@example.com', 'password', 'user1');
            expect(result).toBe('User not found');
        });

        it('should return "Invalid password" if password is incorrect', async () => {
            const mockUser = { id: 1, username: 'user1', email: 'user1@example.com', password: 'hashedPassword', role: 'user' };
            (UserModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            const result = await signin('user1@example.com', 'password', 'user1');
            expect(result).toBe('Invalid password');
        });

        it('should handle errors gracefully during signin', async () => {
            (UserModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('DB error')) });

            try {
                await signin('[user1@example.com', 'password', 'user1');
            } catch (err) {
                if (err instanceof Error) {
                    expect(err.message).toBe('Error occurred during login');
                } else {
                    throw new Error('Unexpected error type');
                }
            }
        });
    });

    describe('signup', () => {
        // it('should return token on successful signup', async () => {
        //     // Mock bcrypt hash
        //     (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
        //     // Mock jwt sign
        //     (jwt.sign as jest.Mock).mockReturnValue('token');

        //     // Mock findOne to return null for both queries
        //     (UserModel.findOne as jest.Mock).mockImplementation((query) => {
        //         if (query.email || query.username) {
        //             return { exec: jest.fn().mockResolvedValue(null) };
        //         } else {
        //             return { exec: jest.fn().mockResolvedValue({ id: 1, email: 'user1@example.com' }) };
        //         }
        //     });

        //     // Mock insertMany
        //     (UserModel.insertMany as jest.Mock).mockResolvedValue(true);

        //     // Call the signup function
        //     const result = await signup('user7@example.com', '123', 'user7');

        //     // Assert the result
        //     expect(result).toBe('token');
        // });

        it('should return "All input is required" if missing input', async () => {
            const result = await signup('', '', '');
            expect(result).toBe('All input is required');
        });

        it('should return "User Already Exist. Please Login" if user already exists', async () => {
            const mockUser = { id: 1, username: 'user1', email: 'user1@example.com' };
            (UserModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });

            const result = await signup('user1@example.com', 'password', 'user1');
            expect(result).toBe('User Already Exist. Please Login');
        });

        it('should handle errors gracefully during signup', async () => {
            (UserModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('DB error')) });

            const result = await signup('user2@example.com', 'password', 'user2');
            expect(result).toBe('Error occurred during signup');
        });
    });
});