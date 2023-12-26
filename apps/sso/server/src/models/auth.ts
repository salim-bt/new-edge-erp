import z from 'zod';

const AuthLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

const AuthSchema = z.object({
    token: z.string(),
    refreshToken: z.string()
});

export { AuthLoginSchema, AuthSchema };