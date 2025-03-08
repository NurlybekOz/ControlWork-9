import { useEffect, useState } from "react";
import {Button, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import { useAppSelector } from "../../app/hooks.ts";
import { selectLoading } from "../../store/TransactionSlice.ts";
import Grid from "@mui/material/Grid2";
import { ITransaction, ITransactionForm } from "../../types";
import Loader from "../../UI/Loader/Loader.tsx";
import { toast } from "react-toastify";

interface Props {
    onSubmitAction: (transaction: ITransactionForm) => void;
    onClose: () => void;
    transaction?: ITransaction | null;
}

const TransactionForm: React.FC<Props> = ({ onSubmitAction, transaction, onClose }) => {
    const [form, setForm] = useState<ITransactionForm>({
        category: { type: '', name: '' },
        amount: 0,
        createdAt: new Date().toISOString(),
    });

    const loading = useAppSelector(selectLoading);

    useEffect(() => {
        if (transaction) {
            setForm({
                category: transaction.category,
                amount: transaction.amount,
                createdAt: transaction.createdAt,
            });
        } else {
            setForm(prevForm => ({
                ...prevForm,
                createdAt: new Date().toISOString(),
            }));
        }
    }, [transaction]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            category: {
                ...prevForm.category,
                [name]: value,
            },
            amount: name === 'amount' ? Number(value) : prevForm.amount,
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.category.type.trim() || !form.category.name.trim() || !form.amount ) {
            toast.error("All fields are required");
            return;
        }
        onSubmitAction(form);
    };

    const categories = form.category.type === 'income'
        ? ['Salary']
        : ['Food', 'Drinks', 'Fun'];

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2} sx={{ mx: 'auto', width: '70%', mt: 0 }}>
                        <Grid size={12}>
                            <Select
                                name="type"
                                value={form.category.type || 'Types' }
                                onChange={onInputChange}
                            >
                                <MenuItem value="Types" selected disabled>Choose Type</MenuItem>
                                <MenuItem value="expense">Expense</MenuItem>
                                <MenuItem value="income">Income</MenuItem>
                            </Select>
                        </Grid>

                        <Grid size={12}>
                            <Select
                                name="name"
                                value={form.category.name || 'Categories'}
                                onChange={onInputChange}
                            >
                                <MenuItem value="Categories" selected disabled>Select Category</MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                sx={{ width: '100%' }}
                                label="Amount"
                                name="amount"
                                variant="outlined"
                                type="number"
                                value={form.amount || ''}
                                onChange={onInputChange}
                            />
                        </Grid>
                    </Grid>
                    <div style={{ marginTop: '16px', textAlign: 'right' }}>
                        <Button variant="contained" color="success" type="submit">
                            Save
                        </Button>
                        <Button variant="outlined" color="error" onClick={onClose} style={{ marginLeft: '8px' }}>
                            Cancel
                        </Button>
                    </div>
                </form>
            )}
        </>
    );
};

export default TransactionForm;
