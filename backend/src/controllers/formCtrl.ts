import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export const handleFormSubmissionCtrl = async (req: Request, res: Response) => {
    
  const { step, userId, name, email, phoneNumber, addressLine1, addressLine2, city, state, pincode, country, fileUrls, multiSelect } = req.body;

  try {
    let submission;

    switch (step) {
      case 1: // Basic Details
        submission = await client.formSubmission.create({
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
        submission = await client.formSubmission.update({
            where: { id: userId },
            data: {
                fileUrls,
            },
        });
        break;

      case 3: // Multi-Select Dropdown
        submission = await client.formSubmission.update({
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

  } catch (error) {
    res.json({ message: "Error while submitting form, try again", error });
  }
};
