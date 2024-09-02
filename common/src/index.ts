import zod from 'zod';


export const signUpSchema = zod.object({
    name: zod.string().min(1),
    email: zod.string().email(),
    password: zod.string().min(8),
});

export type signUpType = zod.infer<typeof signUpSchema>;

export const signInSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
});

export type signInType = zod.infer<typeof signInSchema>;

export const formSchema = zod.object({
    step: zod.number(),
    userId: zod.number(),
    name: zod.string().min(1),
    email: zod.string().email(),
    phoneNumber: zod.string().min(10),
    addressLine1: zod.string(),
    addressLine2: zod.string().optional(),
    city: zod.string(),
    state: zod.string(),
    pincode: zod.string(),
    country: zod.string(),
    fileUrls: zod.array(zod.string()),
    multiSelect: zod.array(zod.string())
});

export type formType = zod.infer<typeof formSchema>;