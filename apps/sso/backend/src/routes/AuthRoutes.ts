import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import {AuthLoginSchema, AuthSchema} from "@src/models/auth";
import {loginUser, logoutUser} from "@src/services/AuthService";
import {ErrorMessages} from "@src/constants/error-messages";


/*** Functions ****/
/**
 * Login
 */
const login = async (
  req: Request,
  res: Response,
) => {
    try {
        // @ts-ignore
        const {email, password} = req.body;

        const data = AuthLoginSchema.parse({email, password});

        const auth = await loginUser(data.email, data.password);

        const tokens = AuthSchema.parse(auth);

        // @ts-ignore
        res.status(HttpStatusCodes.OK).json(tokens);

    }
    catch (err) {
        // @ts-ignore
        if (err.message === ErrorMessages.USER_NOT_FOUND || err.message === ErrorMessages.INVALID_PASSWORD) {
            // @ts-ignore
            res.status(HttpStatusCodes.BAD_REQUEST).json(err.message);
            return;
        }
        // @ts-ignore
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
}


/**
 * Logout
 */

const logout = async (
    req: Request,
    res: Response
) => {
    try {
        // @ts-ignore
        const {userId} = req.body;

        await logoutUser(userId);

        // @ts-ignore
        res.status(HttpStatusCodes.OK).json(ErrorMessages.USER_LOGGED_OUT);

    }
    catch (err) {
        // @ts-ignore
        if (err.message === ErrorMessages.USER_NOT_FOUND) {
            // @ts-ignore
            res.status(HttpStatusCodes.BAD_REQUEST).json(err.message);
            return;
        }
        // @ts-ignore
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
}

export default {login, logout} as const ;