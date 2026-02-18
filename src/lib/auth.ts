/**
 * BETTER AUTH CONFIGURATION
 */

/**
 * NODE PACKAGES
 */
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

/**
 * CONFIG
 */
import config from "../config";

const isProduction = process.env.NODE_ENV === "production";



export const auth = betterAuth({
  baseURL: config.better_auth_url,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: config.google.client_id!,
      clientSecret: config.google.client_secret!,
    },
  },
  
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "student",
        input: true,
      },
      image: {
        type: "string",
        required: false,
      },
      isBlocked: {
        type: "boolean",
        required: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (user.role === "admin") {
            user.role = "student";
          }
          if (!user.role) {
            user.role = "student";
          }
          return {
            data: user,
          };
        },
      },
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:5000",
    "http://192.168.9.142:3000",
    config.client_url,
  ],
  advanced: {
    defaultCookieAttributes: {
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction, // secure in production
      httpOnly: true,
    },
    trustProxy: true,
    cookies: {
      state: {
        attributes: {
          sameSite: "none",
          secure: true,
        },
      },
    },
  },
  secret: config.better_auth_secret,
});
