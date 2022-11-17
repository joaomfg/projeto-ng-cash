import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '123456',
  database: 'ngCashDb',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3002,
  dialect: 'postgres',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}

module.exports = config;
