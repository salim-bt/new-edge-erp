import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import {createUser, deleteUser, getAllUsers, getUser, updateUser} from "@src/services/UserService";
import {UserDelete, UserGet, UserWithoutPassword} from "@src/types/user";
import {UserCreateSchema, UserDeleteSchema, UserGetSchema, UserUpdateSchema} from "@src/models/user";
import {ErrorMessages} from "@src/constants/error-messages";

// **** Functions **** //
/**
 * Get one user.
 */

const getOneUser = async(
    req: Request,
    res: Response
)=> {
    try {
        // @ts-ignore
        const {id} = req.body;
        const data = UserGetSchema.parse({id});

        const user:UserGet = await getUser(data.id);
        // @ts-ignore
        res.status(HttpStatusCodes.OK).json(user);
    } catch (err) {
        if (err.message === ErrorMessages.USER_NOT_FOUND) {
            // @ts-ignore
            res.status(HttpStatusCodes.BAD_REQUEST).json(err.message);
            return;
        }
        // @ts-ignore
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
}


/**
 * Get all users.
 */

const getAll = async(
    req: Request,
    res: Response
) =>{
    try {
        const users = await getAllUsers();
        // @ts-ignore
        res.status(HttpStatusCodes.OK).json(users);
    } catch (err) {
        // @ts-ignore
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
}

/**
 * Add one user.
 */
const add = async(
    req: Request,
    res: Response
)=> {
    try {
        // @ts-ignore
        const {email, name, password } = req.body;
        const data = UserCreateSchema.parse({email, name, password});

        const user:UserWithoutPassword = await createUser(data);
        // @ts-ignore
        res.status(HttpStatusCodes.OK).json(user);
    } catch (err) {
        if (err.message === ErrorMessages.USER_ALREADY_EXISTS) {
            // @ts-ignore
            res.status(HttpStatusCodes.BAD_REQUEST).json(err.message);
            return;
        }
        // @ts-ignore
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
}

/**
 * Update one user.
 */
const update = async(
    req: Request,
    res: Response
)=> {
    try {
        // @ts-ignore
        const {id, email, name, password } = req.body;
        const data = UserUpdateSchema.parse({id, email, name, password});

        const user:UserWithoutPassword = await updateUser(data);
        // @ts-ignore
        res.status(HttpStatusCodes.OK).json(user);
    } catch (err) {
        if (err.message === ErrorMessages.USER_NOT_FOUND) {
            // @ts-ignore
            res.status(HttpStatusCodes.BAD_REQUEST).json(err.message);
            return;
        }
        // @ts-ignore
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
}

/**
 * Delete one user.
 */
const deleteOne = async(
    req: Request,
    res: Response
)=> {
    try {
        // @ts-ignore
        const {id} = req.body;
        const data = UserDeleteSchema.parse({id});

        const user:UserDelete = await deleteUser(data.id);
        // @ts-ignore
        res.status(HttpStatusCodes.OK).json(user);
    } catch (err) {
        if (err.message === ErrorMessages.USER_NOT_FOUND) {
            // @ts-ignore
            res.status(HttpStatusCodes.BAD_REQUEST).json(err.message);
            return;
        }
        // @ts-ignore
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
}


// **** Export default **** //

export default {
    getAll,
    add,
    update,
    delete:deleteOne,

} as const;
