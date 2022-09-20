export {};

declare global {
  namespace Express {
    export interface Request {
      user?: {
        email: string;
      };
    }
    export interface Response {
      user?: {
        email: string;
        [key: string]: string;
      };
    }
  }
}
