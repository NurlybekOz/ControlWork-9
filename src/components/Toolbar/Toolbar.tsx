import { NavLink } from "react-router-dom";
import Modal from "../../UI/Modal/Modal.tsx";
import TransactionForm from "../../components/TransactionForm/TransactionForm.tsx";
import { ITransaction, ITransactionForm } from "../../types";
import { useAppDispatch } from "../../app/hooks.ts";
import {createTransaction, fetchTransactions} from "../../store/TransactionThunks.ts";

interface ToolbarProps {
    onAddClick: () => void;
    onSave: (transaction: ITransactionForm) => void;
    transaction?: ITransaction | null;
    showModal: boolean;
    onCloseModal: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAddClick, onSave, transaction, showModal, onCloseModal }) => {
    const dispatch = useAppDispatch();

    const PostTransaction = (transaction: ITransactionForm) => {
        dispatch(createTransaction(transaction))
            .then(() => {
                dispatch(fetchTransactions());
            })
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <NavLink to="/" className="navbar-brand">Finance Tracker</NavLink>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink to="/category" className="nav-link">Categories</NavLink>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={onAddClick}>
                                    Add
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {showModal && (
                <Modal
                    show={showModal}
                    title={"Add Transaction"}
                    onClose={onCloseModal}
                    onSave={PostTransaction}
                >
                    <TransactionForm onSubmitAction={onSave} transaction={transaction} onClose={onCloseModal} />
                </Modal>
            )}
        </>
    );
};

export default Toolbar;
