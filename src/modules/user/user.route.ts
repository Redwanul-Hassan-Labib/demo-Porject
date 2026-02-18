/**
 * NODE PACKAGES
 */
import { Router } from "express";
/**
 * CONTROLLER
 */
import { UserController } from "./user.controller";
/**
 * MIDDLEWARES
 */
import authMiddleware, { UserRole } from "../../middlewares/auth";

 

const router: Router = Router();

router.get(
  "/auth/me",
  authMiddleware(UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR),
  UserController.getProfile
);



export const UserRoutes = router;
