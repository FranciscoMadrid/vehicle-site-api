import express from 'express';
import cors from 'cors';
import VehicleRoute from './routes/vehicle.route.js';
import LogRoute from './routes/log.route.js';

const app = express();

app.use(cors({
  origin: ['http://localhost:4321', 'https://your-production-site.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

app.use('/api/vehicle', VehicleRoute);
app.use('/api/log', LogRoute);

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});