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