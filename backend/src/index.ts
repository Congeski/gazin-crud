import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import niveisRoutes from './routes/niveis';
import desenvolvedoresRoutes from './routes/desenvolvedores';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/niveis', niveisRoutes);
app.use('/api/desenvolvedores', desenvolvedoresRoutes);

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
