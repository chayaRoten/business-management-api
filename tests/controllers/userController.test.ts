// import {getUsers, login, register} from '../../src/services/user.service';

// // describe('UserService', () => {
// //   describe('register', () => {
// //     it('should return all the users ', async () => {
// //       const user = await getUsers();
// //       expect(user).toEqual({ name: 'Test User' });
// //     });
// //   });
// // });

// import { UserModel } from '../../src/models/user.model';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';

// // Mocking external modules
// jest.mock('../../src/models/user.model');
// jest.mock('jsonwebtoken');
// jest.mock('bcryptjs');

// describe('UserService', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('getUsers', () => {
//     it('should return a list of users', async () => {
//       const mockUsers = [{ id: 1, name: 'User1' }, { id: 2, name: 'User2' }];
//       (UserModel.find as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUsers) });

//       const users = await getUsers();
//       expect(users).toEqual(mockUsers);
//     });
//   });

//   describe('login', () => {
//     it('should return a token when provided valid credentials', async () => {
//       const mockUser = { id: 1, email: 'test@example.com', name: 'Test User', password: 'hashedPassword' };
//       (UserModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });
//       (bcrypt.compare as jest.Mock).mockResolvedValue(true);
//       (jwt.sign as jest.Mock).mockReturnValue('mockToken');

//       const token = await login('test@example.com', 'password', 'Test User');
//       expect(token).toBe('mockToken');
//     });

//     it('should return "Invalid Credentials" when provided invalid credentials', async () => {
//       (UserModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

//       const response = await login('invalid@example.com', 'password', 'Test User');
//       expect(response).toBe('Invalid Credentials');
//     });
//   });

//   describe('register', () => {
//     it('should return a token when registration is successful', async () => {
//       (UserModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
//       (UserModel.findOne as jest.Mock).mockReturnValueOnce({ sort: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue({ id: 1 }) }) });
//       (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
//       (jwt.sign as jest.Mock).mockReturnValue('mockToken');
//       (UserModel.insertMany as jest.Mock).mockResolvedValue({});

//       const token = await register('test@example.com', 'password', 'Test User');
//       expect(token).toBe('mockToken');
//     });

//     it('should return "User Already Exist. Please Login" if user already exists', async () => {
//       (UserModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({ email: 'test@example.com' }) });

//       const response = await register('test@example.com', 'password', 'Test User');
//       expect(response).toBe('User Already Exist. Please Login');
//     });

//     it('should return "All input is required" if not all inputs are provided', async () => {
//       const response = await register('', 'password', 'Test User');
//       expect(response).toBe('All input is required');
//     });
//   });
// });




test('example', () => {
    // כאן ניתן להוסיף את הטסטים הרלוונטיים
  });