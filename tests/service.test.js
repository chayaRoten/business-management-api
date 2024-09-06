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
const services_service_1 = require("../src/services/services.service");
const services_model_1 = require("../src/models/services.model");
// Mock the ServiceModel
jest.mock('../src/models/services.model');
describe('Service Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('getServices', () => {
        it('should return a list of services', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockServices = [{ id: 1, name: 'Service1', cost: 100 }];
            services_model_1.ServiceModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockServices) });
            const result = yield (0, services_service_1.getServices)();
            expect(result).toEqual(mockServices);
        }));
        it('should handle errors gracefully', () => __awaiter(void 0, void 0, void 0, function* () {
            services_model_1.ServiceModel.find.mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('DB error')) });
            yield expect((0, services_service_1.getServices)()).rejects.toThrow('Failed to retrieve services.');
        }));
    });
    describe('getService', () => {
        it('should return a service by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockService = { id: 1, name: 'Service1', cost: 100 };
            services_model_1.ServiceModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockService) });
            const result = yield (0, services_service_1.getService)(1);
            expect(result).toEqual(mockService);
        }));
        it('should handle errors gracefully', () => __awaiter(void 0, void 0, void 0, function* () {
            services_model_1.ServiceModel.findOne.mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('DB error')) });
            yield expect((0, services_service_1.getService)(1)).rejects.toThrow('Failed to retrieve service.');
        }));
    });
    describe('addService', () => {
        // it('should add a new service', async () => {
        //   (ServiceModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
        //   (ServiceModel.findOne as jest.Mock).mockReturnValueOnce({ exec: jest.fn().mockResolvedValue({ id: 1 }) });
        //   (ServiceModel.insertMany as jest.Mock).mockResolvedValue(true);
        //   const result = await addService('Service2', 200);
        //   expect(result).toBe('Data Received!');
        // });
        it('should return error if service already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockService = { id: 1, name: 'Service1', cost: 100 };
            services_model_1.ServiceModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockService) });
            yield expect((0, services_service_1.addService)('Service1', 200)).rejects.toThrow('Service with this name already exists.');
        }));
        it('should handle errors gracefully', () => __awaiter(void 0, void 0, void 0, function* () {
            services_model_1.ServiceModel.findOne.mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('DB error')) });
            yield expect((0, services_service_1.addService)('Service3', 300)).rejects.toThrow('DB error');
        }));
    });
    describe('updateService', () => {
        it('should update an existing service', () => __awaiter(void 0, void 0, void 0, function* () {
            services_model_1.ServiceModel.updateOne.mockResolvedValue({ nModified: 1 });
            const result = yield (0, services_service_1.updateService)(1, 'ServiceUpdated', 150);
            expect(result).toBe('Data Updated!');
        }));
        it('should handle errors gracefully', () => __awaiter(void 0, void 0, void 0, function* () {
            services_model_1.ServiceModel.updateOne.mockRejectedValue(new Error('DB error'));
            yield expect((0, services_service_1.updateService)(1, 'ServiceUpdated', 150)).rejects.toThrow('Failed to update service.');
        }));
    });
    describe('deleteService', () => {
        it('should delete a service by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            services_model_1.ServiceModel.deleteOne.mockResolvedValue({ deletedCount: 1 });
            const result = yield (0, services_service_1.deleteService)(1);
            expect(result).toBe('Data Deleted!');
        }));
        it('should handle errors gracefully', () => __awaiter(void 0, void 0, void 0, function* () {
            services_model_1.ServiceModel.deleteOne.mockRejectedValue(new Error('DB error'));
            yield expect((0, services_service_1.deleteService)(1)).rejects.toThrow('Failed to delete service.');
        }));
    });
});
