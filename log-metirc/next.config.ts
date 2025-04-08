/*
 * @Description: 
 * @Date: 2025-03-03 22:39:44
 * @LastEditTime: 2025-03-18 09:05:57
 */
import type { NextConfig } from "next";
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5433', 10),
});

const nextConfig: NextConfig = {
  /* config options here */
  pool: pool,
  env: {
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
  },
  experimental: {
    turbo: {},
  },
};

export default nextConfig;
