import { Request, Response } from 'express';
import {signUpSchema, signInSchema} from '@rakhshan90/levitation-validation';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from "jsonwebtoken";

const client = new PrismaClient();

export const userSignUpCtrl = async(req: Request, res: Response)=>{
    
    const {name, email, password} = req.body;

    const {success} = await signUpSchema.safeParse({name, email, password});

    if(!success){
        res.status(403);
        return res.json({message: "Invalid input type"});
    }

    const foundUser = await client.user.findUnique({
        where: {email}
    })

    if(foundUser){
        res.status(403);
        return res.json({message: `User already registered with ${foundUser?.email}`});
    }
    
    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await client.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            },
            select: {
                name: true,
                email: true
            }
        });
        
        return res.json(newUser);

    } catch (error) {
        return res.json({message: "Something went wrong while creating your account"});
    }

}

export const userSignInCtrl = async (req: Request, res: Response)=>{
    const {email, password} = req.body;

    const {success} = await signInSchema.safeParse({email, password});

    if(!success){
        res.status(403);
        return res.json({message: "Invalid input type"});
    }

    try {

        const findUser = await client.user.findUnique({
            where: {email}
        });

        if(!findUser){
            res.status(404);
            return res.json({message: `User is not found with ${email}`});
        }

        const passwordValidation = await bcrypt.compare(password, findUser?.password);
        if(!passwordValidation){
            res.status(401);
            return res.json({message: "Invalid password"});
        }

        const token = await jwt.sign({userId: findUser?.id}, process.env.JWT_SECRET_KEY as string);

        res.cookie('token', token);

        return res.json({message: "You are now signed in"});

    } catch (error) {
        return res.json({message: "Failed to login, try again"});
    }
}

export const userSignOutCtrl = async (req: Request, res: Response)=>{
    res.cookie('token', '');
    return res.json({message: "You are now signed out"});
}