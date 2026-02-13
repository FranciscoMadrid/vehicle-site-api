import express from 'express';
import database from './config/database.js'; 
import VehicleRoute from './routes/vehicle.route.js'
import LogRoute from './routes/log.route.js'

const app = express();

app.use(express.json());

app.use('/api/vehicle', VehicleRoute);
app.use('/api/log', LogRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});