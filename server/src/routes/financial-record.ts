import express, { Request, Response } from 'express';
import FinancialRecordModel from '../models/financial-record';

const router = express.Router();

router.get('/getUsersById/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const financialRecords = await FinancialRecordModel.find({ userId: userId });
        if (financialRecords.length === 0) {
            res.status(404).json({ message: 'Financial records not found' });
            return;
        }
        res.status(200).json(financialRecords);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post('/', async (req: Request, res: Response) => { 
    try {
        const newFinancialRecord = new FinancialRecordModel(req.body);
        const savedFinancialRecord = await newFinancialRecord.save();
        res.status(201).json(savedFinancialRecord);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedFinancialRecord = await FinancialRecordModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedFinancialRecord) {
            res.status(404).json({ message: 'Financial record not found' });
            return;
        }
        res.status(200).json(updatedFinancialRecord);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedFinancialRecord = await FinancialRecordModel.findByIdAndDelete(id);
        if (!deletedFinancialRecord) {
            res.status(404).json({ message: 'Financial record not found' });
            return;
        }
        res.status(200).json(deletedFinancialRecord);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export default router;