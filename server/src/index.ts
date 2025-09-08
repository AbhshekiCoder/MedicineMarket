import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import connectDB from './config/DatabaseConnect';

import MedicineRoutes from './Routes/MedicineRoutes';
import requestRoutes from './Routes/requestRoutes';
import distributorRoutes from './Routes/distributorRoute';
import userRoutes from './Routes/userRoutes';
import authRoutes from './Routes/authRoutes';
import bodyParser  = require('body-parser');
import cors from 'cors'
const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors())
connectDB();


app.use('/api/auth',  authRoutes)
//search medicine name , id
app.use('/api/medicines', MedicineRoutes)

// retailer request for medicine
app.use('/api/requests', requestRoutes)

// distributor bid on request
app.use('/api/bids', distributorRoutes)

// user order data
app.use('api/user', userRoutes)

app.get('/', (req: Request, res: Response) =>{
    res.send("hello")
})
app.listen(process.env.PORT || 3000, () =>{
    console.log(`server is running on port ${process.env.PORT}`);
})