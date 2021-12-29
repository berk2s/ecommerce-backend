import { NextFunction, Response } from 'express'
import { IncomingMessage, ServerResponse } from 'http'
import * as jwt from 'jsonwebtoken'
import { TokenUtility } from '../utilities/TokenUtility'

export type NextHandleFunction = (
  req: IncomingMessage,
  res: Response,
  next: NextFunction
) => void

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
  const tokenHeader = req.headers['authorization']

  if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
    res.sendStatus(401)
    return
  }

  const token = tokenHeader.split('Bearer ')[1]

  if (!token) {
    res.sendStatus(401)
    return
  }

  jwt.verify(token, TokenUtility.publicKey, (error: any, payload: any) => {
    if (error) {
      res.sendStatus(401)
      return
    }

    // TODO: checks if token contains valid scope which is already defined before

    next()
  })
}
