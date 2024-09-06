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
exports.DeleteMeeting = exports.UpdateMeeting = exports.AddMeeting = exports.GetMeeting = exports.GetMeetings = void 0;
const meeting_service_1 = require("../services/meeting.service");
/**
 * @swagger
 * /meetings:
 *   get:
 *     summary: Get all meetings for a user
 *     tags: [Meetings]
 *     responses:
 *       200:
 *         description: Successfully retrieved meetings
 *       500:
 *         description: Failed to retrieve meetings
 */
const GetMeetings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // const user_name=req.user?.username;
        // const user_id = await getUserByName(user_name);
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id;
        const meetings = yield (0, meeting_service_1.getMeetings)(user_id);
        res.status(200).json(meetings);
    }
    catch (error) {
        console.error('Error retrieving meetings:', error);
        res.status(500).json({ message: 'Failed to retrieve meetings' });
    }
});
exports.GetMeetings = GetMeetings;
/**
 * @swagger
 * /meeting/{id}:
 *   get:
 *     summary: Get a meeting by ID
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Meeting ID
 *     responses:
 *       200:
 *         description: Successfully retrieved meeting
 *       500:
 *         description: Failed to retrieve meeting
 */
const GetMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const meeting = yield (0, meeting_service_1.getMeeting)(id);
        res.status(200).json(meeting);
    }
    catch (error) {
        console.error('Error retrieving meeting:', error);
        res.status(500).json({ message: 'Failed to retrieve meeting' });
    }
});
exports.GetMeeting = GetMeeting;
/**
 * @swagger
 * /meetings:
 *   post:
 *     summary: Add a new meeting
 *     tags: [Meetings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - note
 *               - serviceType
 *               - date
 *               - startTime
 *               - clientEmail
 *             properties:
 *               note:
 *                 type: string
 *               serviceType:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               startTime:
 *                 type: string
 *               clientEmail:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully added meeting
 *       500:
 *         description: Failed to add meeting
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AddMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { note, serviceType, date, startTime, clientEmail } = req.body;
        const user_name = (_a = req.user) === null || _a === void 0 ? void 0 : _a.username;
        const newMeeting = yield (0, meeting_service_1.addMeeting)(user_name, note, serviceType, date, startTime, clientEmail);
        res.status(201).json({ message: newMeeting });
    }
    catch (error) {
        console.error('Error adding meeting:', error);
        res.status(500).json({ message: 'Failed to add meeting.' });
    }
});
exports.AddMeeting = AddMeeting;
/**
 * @swagger
 * /meetings/{id}:
 *   put:
 *     summary: Update an existing meeting
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Meeting ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - note
 *               - serviceType
 *               - date
 *               - startTime
 *               - clientEmail
 *             properties:
 *               note:
 *                 type: string
 *               serviceType:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               startTime:
 *                 type: string
 *               clientEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated meeting
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Failed to update meeting
 */
const UpdateMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = Number(req.params.id);
        const { note, serviceType, date, startTime, clientEmail } = req.body;
        // const { details, serviceId, date, startTime, duration } = req.body;
        const user_name = (_a = req.user) === null || _a === void 0 ? void 0 : _a.username;
        if (!id || !user_name || !note || !serviceType || !date || !startTime || !clientEmail) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        const newMeeting = yield (0, meeting_service_1.updateMeeting)(user_name, note, serviceType, date, startTime, id, clientEmail);
        // const newMeeting = await updateMeeting(user_id, details, serviceId, date, startTime, id , duration);
        res.send(newMeeting);
    }
    catch (error) {
        console.error('Error updating meeting:', error);
        res.status(500).json({ message: 'Failed to update meeting' });
    }
});
exports.UpdateMeeting = UpdateMeeting;
/**
 * @swagger
 * /meetings/{id}:
 *   delete:
 *     summary: Delete a meeting by ID
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Meeting ID
 *     responses:
 *       200:
 *         description: Successfully deleted meeting
 *       400:
 *         description: Invalid meeting ID
 *       404:
 *         description: Meeting not found
 *       500:
 *         description: Failed to delete meeting
 */
const DeleteMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (!id) {
            res.status(400).json({ message: 'Invalid meeting ID' });
            return;
        }
        const deletedMeeting = yield (0, meeting_service_1.deleteMeeting)(id);
        if (!deletedMeeting) {
            res.status(404).json({ message: 'Meeting not found' });
            return;
        }
        res.status(200).json({ message: 'Meeting deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting meeting:', error);
        res.status(500).json({ message: 'Failed to delete meeting' });
    }
});
exports.DeleteMeeting = DeleteMeeting;
