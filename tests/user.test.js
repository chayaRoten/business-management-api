"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../src/services/user.service");
const user_model_1 = require("../src/models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Mocking the necessary modules
jest.mock('../src/models/user.model');
jest.mock('jsonwebtoken');
jest.mock('bcryptjs');
describe('User Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('getUsers', () => {
        it('should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUsers = [{ id: 1, username: 'user1', email: 'user1@example.com' }];
            user_model_1.UserModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUsers) });
            const result = yield (0, user_service_1.getUsers)();
            expect(result).toEqual(mockUsers);
        }));
        it('should handle errors gracefully', () => __awaiter(void 0, void 0, void 0, function* () {
            user_model_1.UserModel.find.mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('DB error')) });
            try {
                yield (0, user_service_1.getUsers)();
            }
            catch (err) {
                if (err instanceof Error) {
                    expect(err.message).toBe('DB error');
                }
                else {
                    throw new Error('Unexpected error type');
                }
            }
        }));
    });
    describe('getUserByName', () => {
        it('should return user id by username', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { id: 1, username: 'user1' };
            user_model_1.UserModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });
            const result = yield (0, user_service_1.getUserByName)('user1');
            expect(result).toBe(mockUser.id);
        }));
        it('should return undefined if user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            user_model_1.UserModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
            const result = yield (0, user_service_1.getUserByName)('user2');
            expect(result).toBeUndefined();
        }));
    });
    describe('signin', () => {
        it('should return token on successful signin', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { id: 1, username: 'user1', email: 'user1@example.com', password: 'hashedPassword', role: 'user' };
            user_model_1.UserModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });
            bcryptjs_1.default.compare.mockResolvedValue(true);
            jsonwebtoken_1.default.sign.mockReturnValue('token');
            const result = yield (0, user_service_1.signin)('user1@example.com', 'password', 'user1');
            expect(result).toBe('token');
        }));
        it('should return "User not found" if user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            user_model_1.UserModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
            const result = yield (0, user_service_1.signin)('user1@example.com', 'password', 'user1');
            expect(result).toBe('User not found');
        }));
        it('should return "Invalid password" if password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { id: 1, username: 'user1', email: 'user1@example.com', password: 'hashedPassword', role: 'user' };
            user_model_1.UserModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });
            bcryptjs_1.default.compare.mockResolvedValue(false);
            const result = yield (0, user_service_1.signin)('user1@example.com', 'password', 'user1');
            expect(result).toBe('Invalid password');
        }));
        it('should handle errors gracefully during signin', () => __awaiter(void 0, void 0, void 0, function* () {
            user_model_1.UserModel.findOne.mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('DB error')) });
            try {
                yield (0, user_service_1.signin)('[user1@example.com', 'password', 'user1');
            }
            catch (err) {
                if (err instanceof Error) {
                    expect(err.message).toBe('Error occurred during login');
                }
                else {
                    throw new Error('Unexpected error type');
                }
            }
        }));
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
        it('should return "All input is required" if missing input', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, user_service_1.signup)('', '', '');
            expect(result).toBe('All input is required');
        }));
        it('should return "User Already Exist. Please Login" if user already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { id: 1, username: 'user1', email: 'user1@example.com' };
            user_model_1.UserModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });
            const result = yield (0, user_service_1.signup)('user1@example.com', 'password', 'user1');
            expect(result).toBe('User Already Exist. Please Login');
        }));
        it('should handle errors gracefully during signup', () => __awaiter(void 0, void 0, void 0, function* () {
            user_model_1.UserModel.findOne.mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('DB error')) });
            const result = yield (0, user_service_1.signup)('user2@example.com', 'password', 'user2');
            expect(result).toBe('Error occurred during signup');
        }));
    });
});
