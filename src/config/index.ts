import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  better_auth_secret: process.env.BETTER_AUTH_SECRET,
  better_auth_url: process.env.BETTER_AUTH_URL,
  client_url: process.env.CLIENT_URL || "http://localhost:3000",
  admin_email: process.env.ADMIN_EMAIL,
  admin_password: process.env.ADMIN_PASSWORD,
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
  },
};
