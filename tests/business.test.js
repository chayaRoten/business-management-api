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
Object.defineProperty(exports, "__esModule", { value: true });
const business_service_1 = require("../src/services/business.service");
const business_model_1 = require("../src/models/business.model");
jest.mock('../src/models/business.model'); // Mock the BusinessModel
describe('Business Service', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });
    describe('getBusiness', () => {
        it('should return a list of businesses', () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock the find method to return a list of businesses
            const mockBusinesses = [{ id: 1, name: 'Business1' }, { id: 2, name: 'Business2' }];
            business_model_1.BusinessModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockBusinesses) });
            const result = yield (0, business_service_1.getBusiness)();
            expect(result).toEqual(mockBusinesses);
        }));
        it('should throw an error if fetching businesses fails', () => __awaiter(void 0, void 0, void 0, function* () {
            business_model_1.BusinessModel.find.mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('DB error')) });
            yield expect((0, business_service_1.getBusiness)()).rejects.toThrow('Failed to get business.');
        }));
    });
    describe('addBusiness', () => {
        it('should add a new business and return success message', () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock insertMany to return a success response
            business_model_1.BusinessModel.insertMany.mockResolvedValue(true);
            const result = yield (0, business_service_1.addBusiness)(1, 'Business1', '123 Main St', 'A great business', '123-456-7890', 'business1@example.com');
            expect(result).toBe('Data Received!');
        }));
        it('should throw an error if adding a business fails', () => __awaiter(void 0, void 0, void 0, function* () {
            business_model_1.BusinessModel.insertMany.mockRejectedValue(new Error('DB error'));
            yield expect((0, business_service_1.addBusiness)(1, 'Business1', '123 Main St', 'A great business', '123-456-7890', 'business1@example.com')).rejects.toThrow('Failed to add business.');
        }));
    });
    describe('updateBusiness', () => {
        it('should update a business and return success message', () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock updateOne to return a success response
            business_model_1.BusinessModel.updateOne.mockResolvedValue({ nModified: 1 });
            const result = yield (0, business_service_1.updateBusiness)(1, 'Updated Business', '123 Main St', 'Updated description', '123-456-7890', 'business1@example.com');
            expect(result).toBe('Data Updated!');
        }));
        it('should throw an error if updating a business fails', () => __awaiter(void 0, void 0, void 0, function* () {
            business_model_1.BusinessModel.updateOne.mockRejectedValue(new Error('DB error'));
            yield expect((0, business_service_1.updateBusiness)(1, 'Updated Business', '123 Main St', 'Updated description', '123-456-7890', 'business1@example.com')).rejects.toThrow('Failed to update business.');
        }));
    });
});
