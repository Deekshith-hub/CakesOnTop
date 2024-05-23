import { Request, Router, Response } from "express";
import { cakesModel } from '../model/cakes';

export const cakesRouter = Router();

cakesRouter.post(
    '/fetchCakes',
    async (
        req: Request,
        res
    ) => {
        res.send( await cakesModel.fetchCakes(req.body));

    }
);

cakesRouter.post(
    '/fetchCakeById',
    async (
        req: Request,
        res
    ) => {
        res.send( await cakesModel.fetchCakeById(req.body));

    }
);