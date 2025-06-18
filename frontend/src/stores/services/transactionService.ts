import api from "./api";
import { TransactionDepositCreate, TransactionPaymentCreate, TransactionPaymentCreateProject } from "../../types/transaction";

export const getuserTransactionsAPI = async () => {
    return await api.get('/transactions/me')
};

export const depositTransactionAPI = async (transaction: TransactionDepositCreate) => {
    return await api.post('/transactions/', {
        amount: transaction.amount,
        transaction_type: transaction.transaction_type,
    });
};

export const paymentTransactionAPI = async (transaction: TransactionPaymentCreate) => {
    return await api.post('/transactions/', {
        amount: transaction.amount,
        transaction_type: transaction.transaction_type,
        property_id: transaction.property_id,
    });
}
export const paymentTransactionProjectAPI = async (transaction: TransactionPaymentCreateProject) => {
    return await api.post('/transactions/project', {
        amount: transaction.amount,
        transaction_type: transaction.transaction_type,
        project_id: transaction.project_id,
    });
};

export const fetchTransactionByPropertyIdAPI = async (propertyId: number) => {
    return await api.get(`/transactions/property/${propertyId}`);
};

export const fetchTransactionsByProjectAPI = async (project_id: number) => {
  return await api.get(`/project/${project_id}/transactions`);
};