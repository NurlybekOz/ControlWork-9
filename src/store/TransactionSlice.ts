
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";
import {ITransaction} from "../types";
import {
    createTransaction,
    deleteTransaction,
    fetchTransactionById,
    fetchTransactions,
    updateTransaction
} from "./TransactionThunks.ts";


interface TransactionState {
    transactions: ITransaction[];
    currentTransaction: ITransaction | null;
    loading: boolean;
    error: boolean;
}

const initialState: TransactionState = {
    transactions: [],
    currentTransaction: null,
    loading: false,
    error: false,

}

export const selectTransactions = (state: RootState) => state.transaction.transactions;
export const selectLoading = (state: RootState) => state.transaction.loading;
export const selectTransactionById = (state: RootState) => state.transaction.currentTransaction;

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTransactions.pending, (state) => {
            state.loading = true
        }).addCase(fetchTransactions.fulfilled, (state, {payload: transactions}) => {
            state.loading = false
            state.transactions = transactions;
        }).addCase(fetchTransactions.rejected, (state) => {
            state.loading = false
        })

            .addCase(fetchTransactionById.pending, (state) => {
                state.loading = true
            }).addCase(fetchTransactionById.fulfilled, (state, {payload: transaction}) => {
            state.loading = false
            state.currentTransaction = transaction;
        }).addCase(fetchTransactionById.rejected, (state) => {
            state.loading = false
        })

            .addCase(deleteTransaction.pending, (state) => {
                state.loading = true
            }).addCase(deleteTransaction.fulfilled, (state) => {
            state.loading = false
        }).addCase(deleteTransaction.rejected, (state) => {
            state.loading = false
        })

            .addCase(createTransaction.pending, (state) => {
            state.loading = true
        }).addCase(createTransaction.fulfilled, (state) => {
            state.loading = false
        }).addCase(createTransaction.rejected, (state) => {
            state.loading = false
        })
            .addCase(updateTransaction.pending, (state) => {
            state.loading = true
        }).addCase(updateTransaction.fulfilled, (state) => {
            state.loading = false
        }).addCase(updateTransaction.rejected, (state) => {
            state.loading = false
        })
    }
})

export const transactionReducer = transactionSlice.reducer;