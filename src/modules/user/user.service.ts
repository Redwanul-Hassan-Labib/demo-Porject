/**
 * NODE PACKAGES
 */
import { Prisma } from "../../generated/prisma/client";
/**
 * UTILS
 */
import { prisma } from "../../lib/prisma";

const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
  });
  return user;
};



export const UserService = {
  getProfile,
  // updateProfile,
};
