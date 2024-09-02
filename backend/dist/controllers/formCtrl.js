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
exports.handleFormSubmissionCtrl = void 0;
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
const handleFormSubmissionCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { step, userId, name, email, phoneNumber, addressLine1, addressLine2, city, state, pincode, country, fileUrls, multiSelect } = req.body;
    try {
        let submission;
        switch (step) {
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
        res.json({ message: "Form has been submitted", submission });
    }
    catch (error) {
        res.json({ message: "Error while submitting form, try again", error });
    }
});
exports.handleFormSubmissionCtrl = handleFormSubmissionCtrl;
