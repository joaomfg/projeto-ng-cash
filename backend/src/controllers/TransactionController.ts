import { Request, Response } from 'express';
import TransactionService from '../services/TransactionService';

export default class TransactionController {
  private _service = new TransactionService();

  newTransaction = async (req: Request, res: Response) => {
    const { body } = req;

    const newUser = await this._service.newTransaction(body);

    res.status(200).json(newUser);
  };

  filterTr = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    const filteredTransactions = await this._service.filterTr(body, id);

    res.status(200).json(filteredTransactions);
  };
}
