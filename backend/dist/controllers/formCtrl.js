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
exports.getUserSubmissionsCtrl = exports.handleFormSubmissionCtrl = void 0;
const client_1 = require("@prisma/client");
const levitation_validation_1 = require("@rakhshan90/levitation-validation");
const cloudinary_1 = __importDefault(require("../util/cloudinary"));
const client = new client_1.PrismaClient();
const handleFormSubmissionCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { step, name, email, phoneNumber, addressLine1, addressLine2, city, state, pincode, country, multiSelect } = req.body;
    const stepVal = parseInt(step, 10);
    if (stepVal === 1) {
        const { success } = levitation_validation_1.formSchema.safeParse({ userId, name, email, phoneNumber, addressLine1, addressLine2, city, state, pincode, country });
        if (!success) {
            res.status(403);
            return res.json({ message: "Invalid input type" });
        }
    }
    try {
        let submission;
        switch (stepVal) {
            case 1: // Basic Details
                submission = yield client.formSubmission.create({
                    data: {
                        userId,
                        name,
                        email,
                        phoneNumber,
                        addressLine1,
                        addressLine2,
                        city,
                        state,
                        pincode,
                        country,
                    },
                });
                break;
            case 2: // File Uploads
                if (!req.files || !(req.files instanceof Array) || req.files.length === 0) {
                    res.status(400);
                    return res.json({ message: 'No files uploaded' });
                }
                const uploadPromises = req.files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
                    // Use Cloudinary uploader to upload from buffer
                    return yield (0, cloudinary_1.default)(file.buffer);
                }));
                const uploadResults = yield Promise.all(uploadPromises);
                const fileUrls = uploadResults.map((item) => {
                    return item.url;
                });
                submission = yield client.formSubmission.update({
                    where: { id: userId },
                    data: {
                        fileUrls,
                    },
                });
                break;
            case 3: // Multi-Select Dropdown
                submission = yield client.formSubmission.update({
                    where: { id: userId },
                    data: {
                        multiSelect,
                    },
                });
                break;
            default:
                return res.status(400).json({ message: "Invalid step" });
        }
        return res.json({ message: "Form has been submitted", submission });
    }
    catch (error) {
        return res.json({ message: "Error while submitting form, try again", error });
    }
});
exports.handleFormSubmissionCtrl = handleFormSubmissionCtrl;
const getUserSubmissionsCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId; // Assuming `req.userId` contains the authenticated user's ID
        const { search, startDate, endDate } = req.query;
        // Initialize the Prisma query object
        let query = {
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        };
        // Add search filter
        if (search) {
            query.where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { city: { contains: search, mode: 'insensitive' } },
                { state: { contains: search, mode: 'insensitive' } },
                { country: { contains: search, mode: 'insensitive' } },
            ];
        }
        // Add date range filter
        if (startDate || endDate) {
            query.where.createdAt = {};
            if (startDate) {
                query.where.createdAt.gte = new Date(startDate);
            }
            if (endDate) {
                query.where.createdAt.lte = new Date(endDate);
            }
        }
        // Fetch submissions from the database
        const submissions = yield client.formSubmission.findMany(query);
        return res.json({ submissions });
    }
    catch (error) {
        console.error('Error fetching user submissions:', error);
        return res.status(500).json({ message: 'Error fetching submissions', error });
    }
});
exports.getUserSubmissionsCtrl = getUserSubmissionsCtrl;
