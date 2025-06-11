import { config } from 'dotenv';

config(); // Load environment variables from .env file
export const jwtConstants = {
  secret: process.env.JWT_SECRET, // Default secret key if not set in .env
};
