import BackDrop from "../BackDrop/BackDrop.tsx";
import { ITransactionForm } from "../../types";
import TransactionForm from "../../components/TransactionForm/TransactionForm.tsx";

interface Props extends React.PropsWithChildren {
    show?: boolean;
    title?: string;
    onClose: () => void;
    onSave: (transaction: ITransactionForm) => void;
}

const Modal: React.FC<Props> = ({ show = false, title = 'Add Expense/Income', onClose, onSave }) => {

    const handleSave = (formData: ITransactionForm) => {
        onSave(formData);
        onClose();
    };

    return (
        <>
            <BackDrop show={show} onClickBackDrop={onClose} />
            <div className="modal show" style={{
                display: show ? 'block' : 'none', position: 'fixed',
                width: '500px',
                height: '600px',
                overflow: 'hidden',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">{title}</h1>
                        </div>
                        <div className="p-3">
                            <TransactionForm
                                onSubmitAction={handleSave}
                                onClose={onClose}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
