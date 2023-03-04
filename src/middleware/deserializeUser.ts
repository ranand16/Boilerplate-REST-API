import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reissueAccessToken } from "../service/session.service";
import { verifJWT } from "../utils/jwt";

export const decerializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  const refreshToken = get(req, "headers.x-refresh", "");
  if (!accessToken) return next();
  const { valid, expired, decoded } = verifJWT(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  if (expired && refreshToken) {
    const newAccessT = await reissueAccessToken({ refreshToken });
    if (newAccessT) {
      res.setHeader("x-access-token", newAccessT);
    }
    const result = verifJWT(newAccessT || "");
    res.locals.user = result.decoded;
    return next();
  }
  return next();
};
