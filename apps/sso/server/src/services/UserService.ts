import {
    type User,
    type UserCreate,
    type UserUpdate,
    type UserWithoutPassword
} from '@src/types/user';


import {prisma} from '@src/util/db'
import {ErrorMessages} from "@src/constants/error-messages";


//create user

const createUser = async (user: UserCreate): Promise<UserWithoutPassword> => {

    // check if user exists
    // @ts-ignore
    const existingUser:User|null = await prisma.user.findFirst({
        where:{
            email: user.email
        }
    });

    if(existingUser){
        throw new Error(ErrorMessages.USER_ALREADY_EXISTS);
    }

    // @ts-ignore
    const createdUser:User = await prisma.user.create({
       data:{
              email: user.email,
              name: user.name,
              password: user.password
       }
    });


    //remove password
    return {
        createdAt: createdUser.createdAt,
        deletedAt: createdUser.deletedAt,
        email: createdUser.email,
        id: createdUser.id,
        name: createdUser.name,
        updatedAt: createdUser.updatedAt
    };
};

//get user by id

const getUser = async (id:string): Promise<UserWithoutPassword> => {
       // @ts-ignore
    const existingUser:User|null = await prisma.user.findUnique({
        where:{
            id
        }
    });

    if(!existingUser){
        throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    //remove password
    return {
        createdAt: existingUser.createdAt,
        deletedAt: existingUser.deletedAt,
        email: existingUser.email,
        id: existingUser.id,
        name: existingUser.name,
        updatedAt: existingUser.updatedAt
    };
};

//get all users

const getAllUsers = async (): Promise<UserWithoutPassword[]> => {

    const existingUsers:User[] = await prisma.user.findMany();

    //remove password
    return existingUsers.map((user: User):UserWithoutPassword => {
        return {
            createdAt: user.createdAt,
            deletedAt: user.deletedAt,
            email: user.email,
            id: user.id,
            name: user.name,
            updatedAt: user.updatedAt
        };
    });
};

//update user

const updateUser = async ( user: UserUpdate): Promise<UserWithoutPassword> => {
    // @ts-ignore
    const existingUser:User|null = await prisma.user.findFirst({
        where:{
            id: user.id
        }
    });

    if(!existingUser){
        throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    // @ts-ignore
    const updatedUser:User = await prisma.user.update({where:{
            id: user.id
        },
        data:{
            email: user.email,
            name: user.name,
            password: user.password
        }
    });

    //remove password
    return {
        createdAt: updatedUser.createdAt,
        deletedAt: updatedUser.deletedAt,
        email: updatedUser.email,
        id: updatedUser.id,
        name: updatedUser.name,
        updatedAt: updatedUser.updatedAt
    };
};

//delete user

const deleteUser = async (id:string): Promise<UserWithoutPassword> => {
    // @ts-ignore
    const existingUser:User = await prisma.user.findFirst({
        where:{
            id
        }
    });

    if(!existingUser){
        throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    // @ts-ignore
    const deletedUser:User = await prisma.user.delete({where:{
            id
        }
    });

    //remove password
    return {
        createdAt: deletedUser.createdAt,
        deletedAt: deletedUser.deletedAt,
        email: deletedUser.email,
        id: deletedUser.id,
        name: deletedUser.name,
        updatedAt: deletedUser.updatedAt
    };
};

export {getAllUsers, createUser, getUser, updateUser, deleteUser};

