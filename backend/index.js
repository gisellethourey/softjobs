import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import userRoutes from './src/routes/userRoutes.js';
import logger from './src/logger.js';

dotenv.config();

const app = express();

app.use(cors()); 

app.use(express.json());
app.use(logger);
app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server on 🔥 http://localhost:${PORT}`);
});

