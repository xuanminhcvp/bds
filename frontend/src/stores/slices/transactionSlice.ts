import { StateCreator } from 'zustand';
import { getuserTransactionsAPI } from "../services/transactionService";
import { depositTransactionAPI, paymentTransactionAPI, paymentTransactionProjectAPI, fetchTransactionByPropertyIdAPI, fetchTransactionsByProjectAPI} from '../services/transactionService';
import { TransactionDepositCreate, TransactionPaymentCreate, TransactionPaymentCreateProject } from '../../types/transaction';

export interface Transaction {
    title: string;
    amount: number;
    transaction_type: string;
    description: string;
    created_at: string;
}

export interface TransactionSlice {
    transactions: Transaction[];
    isLoadingTransactions: boolean;
    errorTransactions: string | null;
    isFetchedTransactions: boolean;
    fetchUserTransactions: () => Promise<void>;
    depositTransactions: (transaction: TransactionDepositCreate) => Promise<void>;
    paymentTransactions: (transaction: TransactionPaymentCreate) => Promise<void>;
    paymentTransactionsProject: (transaction: TransactionPaymentCreateProject) => Promise<void>;
    fetchTransactionByPropertyId: (propertyId: number) => Promise<Transaction[]>;
    fetchTransactionsByProject: (projectId: number) => Promise<Transaction[]>;
}   

const transactionSlice: StateCreator<TransactionSlice> = (set, get) => ({
    transactions: [],
    isLoadingTransactions: false,
    errorTransactions: null,
    isFetchedTransactions: false,
    fetchUserTransactions: async () => {
        if (get().isFetchedTransactions) return;
        set({ isLoadingTransactions: true, errorTransactions: null });
        try {
            const { data } = await getuserTransactionsAPI();
            set({
                transactions: data,
                isLoadingTransactions: false,
                isFetchedTransactions: true,
            });
        } catch (error: any) {
            set({
                isLoadingTransactions: false,
                errorTransactions: error.response?.data?.message || 'Fetch transactions failed',
            });
        }
    },
    depositTransactions: async (transaction: TransactionDepositCreate) => {
        set({ isLoadingTransactions: true, errorTransactions: null });
        try {   
            const { data } = await depositTransactionAPI(transaction);
            set((state) => ({
                transactions: [
                    ...state.transactions, 
                    data
                ],
                isLoadingTransactions: false,
            }));
        } catch (error: any) {
            set({
                isLoadingTransactions: false,
                errorTransactions: error.response?.data?.message || 'Deposit transaction failed',
            });
        }
    },
    paymentTransactions: async (transaction: TransactionPaymentCreate) => {
        set({ isLoadingTransactions: true, errorTransactions: null });
        try {
            const { data } = await paymentTransactionAPI(transaction);
            set((state) => ({
                transactions: [
                    ...state.transactions, 
                    data
                ],
                isLoadingTransactions: false,
            }));
        } catch (error: any) {
            set({
                isLoadingTransactions: false,
                errorTransactions: error.response?.data?.message || 'Payment transaction failed',
            });
        }
    },
    paymentTransactionsProject: async (transaction: TransactionPaymentCreateProject) => {
        set({ isLoadingTransactions: true, errorTransactions: null });
        try {
            const { data } = await paymentTransactionProjectAPI(transaction);
            set((state) => ({
                transactions: [
                    ...state.transactions,
                    data
                ],
                isLoadingTransactions: false,
            }));
        } catch (error: any) {
            set({
                isLoadingTransactions: false,
                errorTransactions: error.response?.data?.message || 'Payment transaction failed',
            });
        }
    },
    fetchTransactionByPropertyId: async (propertyId: number) => {
        set({ isLoadingTransactions: true, errorTransactions: null });
        try {
            const { data } = await fetchTransactionByPropertyIdAPI(propertyId);
            set({
                transactions: data,
                isLoadingTransactions: false,
            });
            return data;
        } catch (error: any) {
            set({
                isLoadingTransactions: false,
                errorTransactions: error.response?.data?.message || 'Fetch transactions by property ID failed',
            });
            return [];
        }
    },
    fetchTransactionsByProject: async (projectId: number) => {
        set({ isLoadingTransactions: true, errorTransactions: null });
        try {
            const { data } = await fetchTransactionsByProjectAPI(projectId);
            set({
                transactions: data,
                isLoadingTransactions: false,
            });
            return data;
        } catch (error: any) {
            set({
                isLoadingTransactions: false,
                errorTransactions: error.response?.data?.message || 'Fetch transactions by project ID failed',
            });
            return [];
        }
    }
});

export default transactionSlice;
