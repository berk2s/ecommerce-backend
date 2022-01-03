import { NextFunction, Response } from "express";
import { IncomingMessage, ServerResponse } from "http";
import * as jwt from "jsonwebtoken";
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
      console.log("payload", payload);
      res.sendStatus(401);
      return;
    }

    console.log("payload", payload);

    // TODO: checks if token contains valid scope which is already defined before

    // TODO: check what is the return pattern of req.url

    const url = req.url;
    const method = req.method;

    const scopeOfUrl: RouteScope = scopes.find(
      (scope) => scope.url === url && scope.method === method
    )[0];

    // console.log("scopeURL", scopeOfUrl);

    const scopesOfUser = payload.scopes;

    console.log("payload", payload);

    // scopes[0] = read:products gibi geliyor
    if (!scopesOfUser.includes(scopeOfUrl.scopes[0])) {
      res.sendStatus(403);
    }
    next();
  });
};
