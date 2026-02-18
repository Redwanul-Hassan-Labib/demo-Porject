/**
 * NODE PACKAGES
 */
import { Request, Response } from "express";
/**
 * SERVICES
 */
import { UserService } from "./user.service";
/**
 * MIDDLEWARES
 */
import { asyncHandler } from "../../middlewares/asyncHandler";
/**
 * UTILS
 */
import { sendError, sendSuccess } from "../../utils/response";
import { auth } from "../../lib/auth";
import { error } from "node:console";

const getProfile = asyncHandler(async (req: Request, res: Response) => {
  
  // const userId = req.user!.id;
  const user = req.user
  if (!user) {
    throw new Error("You are unauthorized") //You are Unauthorized
  }
  const result = await UserService.getProfile(user?.id);
  sendSuccess(res, { data: result }, "Profile fetched successfully");
});

// const updateProfile = asyncHandler(async (req: Request, res: Response) => {
//   const userId = req.user!.id;
//   const user = await UserService.updateProfile(userId, req.body);
//   sendSuccess(res, { data: user }, "Profile updated successfully");
// });

// const getStudentDashboardStats = asyncHandler(
//   async (req: Request, res: Response) => {
//     const userId = req.user!.id;
//     const stats = await UserService.getStudentDashboardStats(userId);
//     sendSuccess(res, { data: stats }, "Student stats fetched successfully");
//   },
// );

export const UserController = {
  getProfile,
  // updateProfile,
  // getStudentDashboardStats,
};
