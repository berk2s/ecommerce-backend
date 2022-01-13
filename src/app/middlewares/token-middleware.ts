import { NextFunction, Response } from "express";
import { IncomingMessage } from "http";
import * as jwt from "jsonwebtoken";
import { API } from "../utilities/api-endpoints";
import { RouteScope, scopes } from "../utilities/scopes";
import { TokenUtility } from "../utilities/TokenUtility";

export type NextHandleFunction = (
  req: IncomingMessage,
  res: Response,
  next: NextFunction
) => void;

/**
 * Checks if given bearer token is valid or not
 * @param req contains information about request
 * @param res performs response actions
 * @param next iterates to next step of chain
 */
export const tokenMiddleware: NextHandleFunction = (
  req: IncomingMessage,
  res: Response,
  next: NextFunction
): void => {
  const tokenHeader = req.headers["authorization"];

  if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
    res.sendStatus(401);
    return;
  }

  const token = tokenHeader.split("Bearer ")[1];

  if (!token) {
    console.log("token", token);
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, TokenUtility.publicKey, (error: any, payload: any) => {
    if (error) {
      res.sendStatus(401);
      return;
    }

    const method = req.method;
    let url = req.url.split(API.API_PREFIX)[1];

    if (url.split("/").length > 2) {
      url = url.split("/")[1];
    }

    const scopeOfUrl: RouteScope = scopes.find(
      (scope) => scope.url === url && scope.method === method
    );

    const scopesOfUser = [];

    payload.scopes
      .trim()
      .split(" ")
      .forEach((scope) => {
        scopesOfUser.push(scope);
      });

    if (!scopeOfUrl.scopes.some((scope) => scopesOfUser.includes(scope))) {
      res.sendStatus(403);
      return;
    }
    next();
  });
};
