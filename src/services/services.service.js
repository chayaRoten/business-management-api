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
exports.deleteService = exports.updateService = exports.addService = exports.getService = exports.getServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const services_model_1 = require("../models/services.model");
const getServices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield services_model_1.ServiceModel.find().exec();
        return services;
    }
    catch (error) {
        console.error('Error retrieving services:', error);
        throw new Error('Failed to retrieve services.');
    }
});
exports.getServices = getServices;
const getService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield services_model_1.ServiceModel.findOne({ id }).exec();
        return service;
    }
    catch (error) {
        console.error('Error retrieving service:', error);
        throw new Error('Failed to retrieve service.');
    }
});
exports.getService = getService;
const addService = (name, cost) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingService = yield services_model_1.ServiceModel.findOne({ name }).exec();
        if (existingService) {
            throw new Error('Service with this name already exists.');
        }
        const lastServices = yield services_model_1.ServiceModel.findOne().sort({ id: -1 }).exec();
        const newId = lastServices ? lastServices.id + 1 : 1;
        yield services_model_1.ServiceModel.insertMany({ name, cost: cost, id: newId });
        return 'Data Received!';
    }
    catch (error) {
        console.error('Error adding service:', error);
        throw new Error(error.message || 'Failed to add service.');
    }
});
exports.addService = addService;
const updateService = (id, name, cost) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield services_model_1.ServiceModel.updateOne({ id }, { name, cost });
        return 'Data Updated!';
    }
    catch (error) {
        console.error('Error updating service:', error);
        throw new Error('Failed to update service.');
    }
});
exports.updateService = updateService;
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield services_model_1.ServiceModel.deleteOne({ id });
        return 'Data Deleted!';
    }
    catch (error) {
        console.error('Error deleting service:', error);
        throw new Error('Failed to delete service.');
    }
});
exports.deleteService = deleteService;
