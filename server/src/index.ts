import express, { Express } from 'express';
import mongoose from 'mongoose';
import FinancialRecordRouter from './routes/financial-record';
import cors from 'cors';

const app: Express = express();

const port: string | number = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use('/api/financial-records', FinancialRecordRouter);

const mongoURI: string = "mongodb+srv://Mzyttt:xwU0DAvujjnbujrD@cluster0.dfsl1.mongodb.net/"

mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});