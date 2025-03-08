export interface ITransaction {
    id: string;
    category: {
        type: string;
        name: string;
    }
    amount: number;
    createdAt: string;
}
export interface ITransactionForm {
    category: {
        type: string;
        name: string;
    }
    amount: number;
    createdAt: string;
}
export interface ITransactionApi {
    [id: string]: ITransactionForm;
}