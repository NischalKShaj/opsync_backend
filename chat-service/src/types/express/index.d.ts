import { JwtUserPayload } from "../JwtPayload";

declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}

export {};
