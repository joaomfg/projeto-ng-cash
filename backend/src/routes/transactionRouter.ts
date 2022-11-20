import { Router } from 'express';
import ValidateTransaction from '../middlewares/validateTransaction';
import JwtValidation from '../auth/jwt';

import TransactionController from '../controllers/TransactionController';

const transactionRouter = Router();

const transactionController = new TransactionController();

transactionRouter.post('/',
    JwtValidation.validateToken,
    ValidateTransaction.validateUsers,
    ValidateTransaction.validateAccount,
    transactionController.newTransaction,
);

transactionRouter.get('/:id',
    JwtValidation.validateToken,
    transactionController.findUserTransactions,
);

transactionRouter.post('/filter/:id',
    JwtValidation.validateToken,
    transactionController.filterTr,
);

export default transactionRouter;
