import {ErrorMessages} from "@src/constants/error-messages";
import {prisma} from "@src/util/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import EnvVars from "@src/constants/EnvVars";
import {User} from "@src/types/user";

const loginUser = async (email: string, password: string) => {
    // @ts-ignore
    const existingUser: User = await prisma.user.findFirst(
        {
            where: {
                email
            },
        }
    )

    if (!existingUser) {
        throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    const isPasswordValid:boolean = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
        throw new Error(ErrorMessages.INVALID_PASSWORD);
    }

    const token:string = jwt.sign({ id: existingUser.id }, EnvVars.Jwt.Secret, { expiresIn: '1h' });
    const refreshToken:string = jwt.sign({ id: existingUser.id }, EnvVars.Jwt.Secret, { expiresIn: '7d' });

    // @ts-ignore
    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: existingUser.id
        }
    });

    return {
        token,
        refreshToken
    };
}

const logoutUser = async (userId: string) => {

    // @ts-ignore
    const existingUser = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!existingUser) {
        throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    // @ts-ignore
    await prisma.refreshToken.delete({where: {
            userId:existingUser.id
        }
    });
}

const refreshUser = async (refreshToken: string) => {
    // @ts-ignore
    const existingRefreshToken: RefreshToken|null = await prisma.refreshToken.findFirst({
        where: {
            token: refreshToken
        }
    });

    if (!existingRefreshToken) {
        throw new Error(ErrorMessages.USER_NOT_LOGGED_IN);
    }

    // @ts-ignore
    const user: User|null = await prisma.user.findUnique({
        where: {
            id: existingRefreshToken.userId
        }
    });

    if (!user) {
        throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    const token:string = jwt.sign({ id: user.id }, EnvVars.Jwt.Secret, { expiresIn: '1h' });
    const newRefreshToken:string = jwt.sign({ id: user.id }, EnvVars.Jwt.Secret, { expiresIn: '7d' });

    // @ts-ignore
    await prisma.refreshToken.update({
        where: {
            id: existingRefreshToken.id
        },
        data: {
            token: newRefreshToken
        }
    });

    return {
        token,
        refreshToken: newRefreshToken
    };
}

export {
    loginUser,
    logoutUser,
    refreshUser
};