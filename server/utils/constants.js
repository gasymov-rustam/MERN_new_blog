import dotenv from 'dotenv';
dotenv.config();

const DB_NAME = process.env.DB_NAME ?? '';
const DB_USER = process.env.DB_USER ?? '';
const DB_PASSWORD = process.env.DB_PASSWORD ?? '';

export const PORT = process.env.PORT ?? 5001;
export const connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.k4ggl3b.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
