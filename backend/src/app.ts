import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import listingRoutes from "./routes/listing.routes";


const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use("/api/listroom", listingRoutes);

export default app;
