import { useAppDispatch } from "../../app/hooks";
import { useAppSelector } from "../../app/hooks.ts";
import { selectLoading, selectTransactions, selectTransactionById } from "../../store/TransactionSlice.ts";
import { useEffect, useState } from "react";
import { ITransactionForm } from "../../types";
import { deleteTransaction, fetchTransactionById, fetchTransactions, updateTransaction } from "../../store/TransactionThunks.ts";
import Loader from "../../UI/Loader/Loader.tsx";
import Modal from "../../UI/Modal/Modal.tsx";
import TransactionForm from "../../components/TransactionForm/TransactionForm.tsx";
import dayjs from "dayjs";
import { useLocation } from 'react-router-dom';

const Home = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoading);
    const transactions = useAppSelector(selectTransactions);
    const [showModal, setShowModal] = useState<string | null>(null);
    const [transactionIdToEdit, setTransactionIdToEdit] = useState<string | null>(null)
    const currentTransaction = useAppSelector(selectTransactionById);
    const location = useLocation();

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const handleOpenModal = (transactionId: string) => {
        setTransactionIdToEdit(transactionId);
        setShowModal(transactionId);
        dispatch(fetchTransactionById(transactionId));
    };

    const handleCloseModal = () => {
        setShowModal(null);
        setTransactionIdToEdit(null);
    };

    const handleDelete = (transactionId: string) => {
        dispatch(deleteTransaction(transactionId))
            .then(() => {
                dispatch(fetchTransactions());
                handleCloseModal();
            });
    };

    const handleEdit = (updatedTransaction: ITransactionForm) => {
        if (transactionIdToEdit) {
            dispatch(updateTransaction({ id: transactionIdToEdit, transaction: updatedTransaction }))
                .then(() => {
                    dispatch(fetchTransactions());
                    handleCloseModal();
                });
        }
    };

    const totalBalance = transactions.reduce((total, transaction) => {
        if (transaction.category.type === 'income') {
            return total + transaction.amount;
        } else if (transaction.category.type === 'expense') {
            return total - transaction.amount;
        }
        return total;
    }, 0);
    const verifiedBalance = totalBalance < 0 ? 0 : totalBalance;
    const isCategoryPage = location.pathname.includes("/category");

    return (
        <div className="row mt-2">
            <div className="col-6">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {!isCategoryPage && (
                            <div className="total-balance">
                                <h3>Total Balance: {verifiedBalance}</h3>
                            </div>
                        )}

                        {transactions.map((transaction) => (
                            <div key={transaction.id} className="d-flex flex-column align-items-center w-100">
                                <div className="d-flex gap-4 align-items-center justify-content-between border w-100 bg-white m-2 p-3">
                                    <div className='d-flex gap-4'>
                                        {!isCategoryPage && (
                                            <>
                                                <span>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
                                                <strong>{transaction.amount}</strong>
                                            </>
                                        )}
                                        {transaction.category.name}
                                    </div>

                                    <div className='d-flex gap-2 align-items-center '>
                                        {isCategoryPage && (
                                            <strong>{transaction.category.type}</strong>
                                        )}
                                        <button type="button" className='btn btn-primary' onClick={() => handleOpenModal(transaction.id)}>
                                            Edit
                                        </button>
                                        <button type="button" className='btn btn-danger' onClick={() => handleDelete(transaction.id)}>
                                            X
                                        </button>
                                    </div>
                                </div>

                                {showModal && currentTransaction &&(
                                    <Modal
                                        show={showModal === transaction.id}
                                        title={`Edit Income/Expense`}
                                        onClose={handleCloseModal}
                                        onSave={handleEdit}
                                    >
                                        <TransactionForm
                                            onSubmitAction={handleEdit}
                                            transaction={currentTransaction}
                                            onClose={handleCloseModal}
                                        />
                                    </Modal>
                                )}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
