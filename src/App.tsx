import './App.css';
import { Route, Routes } from "react-router-dom";
import Toolbar from "./components/Toolbar/Toolbar.tsx";
import Home from "./containers/Home/Home.tsx";
import { useState } from 'react';
import { ITransaction, ITransactionForm } from './types';
import {useAppDispatch} from "./app/hooks.ts";
import {createTransaction} from "./store/TransactionThunks.ts";

const App = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState<ITransaction | null>(null);
    const dispatch = useAppDispatch();

    const handleAddClick = () => {
        setTransactionToEdit(null);
        setShowAddModal(true);
    };

    const handleCloseModal = () => {
        setShowAddModal(false);
    };

    const handleSave = (transaction: ITransactionForm) => {
            dispatch(createTransaction(transaction))
        setShowAddModal(false);
    };

    return (
        <>
            <header className="mb-5">
                <Toolbar
                    onAddClick={handleAddClick}
                    onSave={handleSave}
                    transaction={transactionToEdit}
                    showModal={showAddModal}
                    onCloseModal={handleCloseModal}
                />
            </header>
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category" element={<Home />} />
                    <Route path="*" element={<h1>Page not found</h1>} />
                </Routes>
            </main>
        </>
    );
};

export default App;
