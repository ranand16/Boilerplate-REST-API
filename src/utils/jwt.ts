import c from "config";
import jwt from "jsonwebtoken";

const privateKey = c.get<string>("private");
const publicKey = c.get<string>("public");
export function signJWT(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifJWT(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return { valid: true, expired: false, decoded };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message.includes("expired"),
      decoded: null,
    };
  }
}
