import z from 'zod';

import {
    UserSchema,
    UserDeleteSchema,
    UserGetSchema,
    UserListSchema,
    UserLoginResponseSchema,
    UserLoginSchema,
    UserCreateSchema,
    UserUpdateSchema,
    UserWithoutPasswordSchema
} from '@src/models/user';

type User = z.infer<typeof UserSchema>;
type UserDelete = z.infer<typeof UserDeleteSchema>;
type UserGet = z.infer<typeof UserGetSchema>;
type UserList = z.infer<typeof UserListSchema>;
type UserLoginResponse = z.infer<typeof UserLoginResponseSchema>;
type UserLogin = z.infer<typeof UserLoginSchema>;
type UserCreate = z.infer<typeof UserCreateSchema>;
type UserUpdate = z.infer<typeof UserUpdateSchema>;
type UserWithoutPassword = z.infer<typeof UserWithoutPasswordSchema>;


export type {
    User,
    UserDelete,
    UserGet,
    UserList,
    UserLoginResponse,
    UserLogin,
    UserCreate,
    UserUpdate,
    UserWithoutPassword
};