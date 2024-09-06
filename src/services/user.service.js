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
exports.signup = exports.signin = exports.getUserByName = exports.getUsers = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.UserModel.find().exec();
    return users;
});
exports.getUsers = getUsers;
const getUserByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ username: name }).exec();
    return user === null || user === void 0 ? void 0 : user.id;
});
exports.getUserByName = getUserByName;
const signin = (email, password, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findOne({ email, username }).exec();
        if (!user) {
            return 'User not found';
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return 'Invalid password';
        }
        const token = jsonwebtoken_1.default.sign({ user_id: user.id, username: user.username, email: user.email, role: user.role }, process.env.TOKEN_KEY || '', {
            expiresIn: '2h'
        });
        return token;
    }
    catch (err) {
        console.error('Error occurred during login:', err);
        throw new Error('Error occurred during login');
    }
});
exports.signin = signin;
const signup = (email, password, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(email && password && username)) {
            return 'All input is required';
        }
        const existingUser = yield user_model_1.UserModel.findOne({ email, username }).exec();
        console.log('Existing user:', existingUser);
        if (existingUser) {
            return 'User Already Exist. Please Login';
        }
        console.log('aaa', email, password, username);
        const lastUser = yield user_model_1.UserModel.findOne().sort({ id: -1 }).exec();
        console.log('Last user:', lastUser);
        const newId = lastUser ? lastUser.id + 1 : 1;
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        console.log('Encrypted password:', encryptedPassword);
        const newUser = {
            username,
            id: newId,
            email,
            password: encryptedPassword,
            role: 'user'
        };
        yield user_model_1.UserModel.insertMany(newUser);
        console.log('User inserted:', newUser);
        const token = jsonwebtoken_1.default.sign({ user_id: newUser === null || newUser === void 0 ? void 0 : newUser.id, username, email, role: newUser === null || newUser === void 0 ? void 0 : newUser.role }, process.env.TOKEN_KEY || '', { expiresIn: '2h' });
        return token;
    }
    catch (err) {
        console.error('Error occurred during signup:', err);
        return 'Error occurred during signup';
    }
});
exports.signup = signup;
