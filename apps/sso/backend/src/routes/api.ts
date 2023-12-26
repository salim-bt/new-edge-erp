import { Router } from 'express';

import Paths from '../constants/Paths';
import UserRoutes from './UserRoutes';
import AuthRoutes from './AuthRoutes';


// **** Variables **** //

const apiRouter = Router();


// ** Add UserRouter ** //

const userRouter = Router();

// Get all users

userRouter.get(
  Paths.Users.Get,
    // @ts-ignore
  UserRoutes.getAll,
);

// Get one user
//userRouter.get(
//  Paths.Users.GetOne,
    // @ts-ignore
//  UserRoutes.getOne,
//);

// Add one user
userRouter.post(
  Paths.Users.Add,
    // @ts-ignore
  UserRoutes.add,
);

// Update one user
userRouter.put(
  Paths.Users.Update,
  // @ts-ignore
  UserRoutes.update,
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
    // @ts-ignore
  UserRoutes.delete,
);

const authRouter = Router();

// Login
authRouter.post(
  Paths.Auth.Login,
    // @ts-ignore
  AuthRoutes.login,
);

// Logout
authRouter.post(
  Paths.Auth.Logout,
    // @ts-ignore
  AuthRoutes.logout,
);


// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);




// **** Export default **** //

export default apiRouter;
