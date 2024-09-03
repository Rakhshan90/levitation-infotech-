import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { formSchema } from '@rakhshan90/levitation-validation';
import fs from 'fs';
import cloudinaryUploader from '../util/cloudinary';

const client = new PrismaClient();

export const handleFormSubmissionCtrl = async (req: any, res: Response) => {


  const userId = req.userId;

  const { step, name, email, phoneNumber, addressLine1, addressLine2, city, state, pincode, country, multiSelect } = req.body;

  const stepVal = parseInt(step, 10); 

  if (stepVal === 1) {
    const { success } = formSchema.safeParse({ userId, name, email, phoneNumber, addressLine1, addressLine2, city, state, pincode, country });
    if (!success) {
      res.status(403);
      return res.json({ message: "Invalid input type" });
    }
  }


  try {
    let submission;

    switch (stepVal) {
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
        if (!req.files || !(req.files instanceof Array) || req.files.length === 0) {
          res.status(400)
          return res.json({ message: 'No files uploaded' });
        }

        const uploadPromises = (req.files as Express.Multer.File[]).map(async (file) => {
          // Use Cloudinary uploader to upload from buffer
          return await cloudinaryUploader(file.buffer);
        });

        const uploadResults = await Promise.all(uploadPromises);

        const fileUrls = uploadResults.map((item) => {
          return item.url;
        })

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

    return res.json({ message: "Form has been submitted", submission });

  } catch (error) {
    return res.json({ message: "Error while submitting form, try again", error });
  }
};




export const getUserSubmissionsCtrl = async (req: any, res: Response) => {
  try {
    const userId = req.userId; // Assuming `req.userId` contains the authenticated user's ID
    const { search, startDate, endDate } = req.query;

    // Initialize the Prisma query object
    let query: any = {
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
        query.where.createdAt.gte = new Date(startDate as string);
      }
      if (endDate) {
        query.where.createdAt.lte = new Date(endDate as string);
      }
    }

    // Fetch submissions from the database
    const submissions = await client.formSubmission.findMany(query);

    return res.json({ submissions });
  } catch (error) {
    console.error('Error fetching user submissions:', error);
    return res.status(500).json({ message: 'Error fetching submissions', error });
  }
};
