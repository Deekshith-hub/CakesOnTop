import { Request, Router, Response } from "express";
import { userModel } from '../model/user';

export const userRouter = Router();

userRouter.post(
    '/register',
    async (
        req: Request,   //{data : {phone : string}}. Accesing req.body.data.phone {phone: number, name: string, email: string, password: string }
        res
    ) => {
        // console.log(req.body);
        res.send(await userModel.register(req.body));
    }
);

userRouter.post(
    '/login',
    async (
        req: Request,              // doesn't always require to add <unknown, unknown, {phone: number, password: string }. This is for data safety
        res
    ) => {
        res.status(200).send(await userModel.login(req.body));
    }
)

userRouter.post(
    '/changepass',
    async (
        req: Request,
        res
    ) => {
        res.send(await userModel.changePass(req.body));
    }
)

userRouter.post(
    '/checkexistuser',
    async (
        req: Request,
        res
    ) => {
        res.send(await userModel.checkExistUser(req.body));
    }
)

userRouter.post(
    '/',
    async (
        req: Request,
        res: Response
    ) => {        
        res.send(await userModel.checkSessionExpire(req.body));
    }
)