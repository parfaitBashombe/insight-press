import { Router } from "express";
import { user, role } from "@/generated/prisma/client.js";

interface IRoute {
  path: string;
  router: Router;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: user;
      currentRole?: role;
    }
  }
}
