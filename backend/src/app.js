import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import documentRoutes from './routes/document.routes.js';
dotenv.config();

const app = express();

// Middleware  

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

app.get('/health', (req, res) => {
res.json({ success: true,
message: 'Server is healthy!'
 });
});
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
export default app;