import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi.ts";
import { ITransaction, ITransactionApi, ITransactionForm } from "../types";

export const fetchTransactions = createAsyncThunk<ITransaction[], void>(
    'transactions/fetchTransactions',
    async () => {
        const response = await axiosApi.get<ITransactionApi | null>('transactions.json');
        const TransactionsListObject = response.data;
        if (!TransactionsListObject) {
            return [];
        } else {
            return Object.keys(TransactionsListObject).map((TransactionId) => {
                const Transaction = TransactionsListObject[TransactionId];
                return {
                    ...Transaction,
                    id: TransactionId,
                };
            });
        }
    }
);

export const fetchTransactionById = createAsyncThunk<ITransaction, string>(
    'transactions/fetchById',
    async (transactionId) => {
        const response = await axiosApi.get<ITransaction>(`/transactions/${transactionId}.json`);
        return response.data;
    }
);
export const updateTransaction = createAsyncThunk<void, { id: string; transaction: ITransactionForm }>(
    'transactions/updateTransaction',
    async ({ id, transaction }) => {
        await axiosApi.put(`transactions/${id}.json`, transaction);
    }
);

export const createTransaction = createAsyncThunk<void, ITransactionForm>(
    'transactions/createTransaction',
    async (transactionToCreate) => {
        await axiosApi.post('transactions.json', transactionToCreate);
    }
);

export const deleteTransaction = createAsyncThunk<void, string>(
    'transactions/deleteTransaction',
    async (transactionId) => {
        await axiosApi.delete(`transactions/${transactionId}.json`);
    }
);
