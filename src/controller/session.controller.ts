import { NextFunction, Request, Response } from "express";
import {
  createSession,
  getSessions,
  updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJWT } from "../utils/jwt";
import config from "config";

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate user's password
  const user = await validatePassword(req.body);
  if (!user) return res.status(401).send("Invalid email or password");

  //create session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create an access token
  const accessToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get("accessTokenTTL"),
    }
  );
  // create a refresh token
  const refreshToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get("refreshTokenTTL"),
    }
  );
  // return access & refresh tokens
  return res.send({ refreshToken, accessToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await getSessions({ user: userId, valid: true });
  return res.send(sessions);
}

export async function deleteSessionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sessionId = res.locals.user.session;
  await updateSession({ _id: sessionId }, { valid: false });
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
