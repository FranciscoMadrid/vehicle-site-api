import express from 'express';
import cors from 'cors';
import VehicleRoute from './routes/vehicle.route.js';
import LogRoute from './routes/log.route.js';
import ModelRoute from "./routes/model.route.js"
import BrandRoute from "./routes/brand.route.js"

const app = express();

app.use(cors({
  origin: ['http://localhost:4321', 'https://flowdrive-api.ffmsdev.com/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

app.use('/api/vehicle', VehicleRoute);
app.use('/api/log', LogRoute);
app.use('/api/model', ModelRoute)
app.use('/api/brand', BrandRoute)

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});