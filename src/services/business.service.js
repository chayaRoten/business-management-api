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
exports.updateBusiness = exports.addBusiness = exports.getBusiness = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const business_model_1 = require("../models/business.model");
const getBusiness = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const business = yield business_model_1.BusinessModel.find().exec();
        return business;
    }
    catch (error) {
        console.error('Error getting business:', error);
        throw new Error('Failed to get business.');
    }
});
exports.getBusiness = getBusiness;
const addBusiness = (id, name, address, about, phone, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield business_model_1.BusinessModel.insertMany({ id, name, address, about, phone, email });
        return 'Data Received!';
    }
    catch (error) {
        console.error('Error adding business:', error);
        throw new Error('Failed to add business.');
    }
});
exports.addBusiness = addBusiness;
const updateBusiness = (id, name, address, about, phone, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield business_model_1.BusinessModel.updateOne({ id }, { name, address, about, phone, email });
        return 'Data Updated!';
    }
    catch (error) {
        console.error('Error updating business:', error);
        throw new Error('Failed to update business.');
    }
});
exports.updateBusiness = updateBusiness;
