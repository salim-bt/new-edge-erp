import z from "zod";

/*** User
 model User {
 id           String         @id @db.Uuid
 email        String         @db.VarChar(255)
 name         String         @db.VarChar(255)
 password     String         @db.VarChar(255)
 createdAt    DateTime       @default(now()) @db.Timestamp(6)
 updatedAt    DateTime       @default(now()) @db.Timestamp(6)
 deletedAt    DateTime?      @db.Timestamp(6)
 }
 ***/

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(8),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable()
});

export const UserWithoutPasswordSchema = UserSchema.omit({
    password: true
});

export const UserCreateSchema = UserSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true
});

export const UserUpdateSchema = UserSchema.omit({
    createdAt: true,
    updatedAt: true,
    deletedAt: true
});

export const UserDeleteSchema = UserSchema.pick({
    id: true
});

export const UserGetSchema = UserSchema.pick({
    id: true
});

export const UserListSchema = UserSchema.omit({
    password: true
});

export const UserLoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export const UserLoginResponseSchema = z.object({
    token: z.string()
});



