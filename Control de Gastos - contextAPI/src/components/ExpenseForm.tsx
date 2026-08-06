import DatePicker from "react-date-picker";
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { useEffect, useState, type ChangeEvent } from "react";
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";
import CategoryFilter from "./CategoryFilter";

export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: '' as unknown as number,
        expenseName: '',
        category: '',
        date: new Date()
    })
    const [error, setError] = useState('')
    const [previousAmount, setPreviousAmount] = useState(0)
    const { dispatch, state, remainingBudget } = useBudget()

    useEffect(() => {
        if (state.editingId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            if (editingExpense) {
                setExpense(editingExpense)
                setPreviousAmount(editingExpense.amount)
            }
        }
    }, [state.editingId])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        if (isAmountField) {
            if (/^\d*$/.test(value)) {
                setExpense({
                    ...expense,
                    amount: value as unknown as number
                })
            }
        } else {
            setExpense({
                ...expense,
                [name]: value
            })
        }
    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        const amountNumber = +expense.amount
        const amountString = String(expense.amount)

        //validar
        if (expense.expenseName.trim() === '' || expense.category.trim() === '' || amountString === '' || isNaN(amountNumber) || amountNumber <= 0) {
            setError('Todos los campos son obligatorios y la cantidad debe ser mayor a 0')
            return
        }

        //validar no sobregirar
        if ((amountNumber - previousAmount) > remainingBudget) {
            setError('El monto asignado supera el valor del presupuesto')
            return
        }

        //limpiar errores si pasa la validacion
        setError('')

        //agregar o actualizar el gasto
        const expenseToSave: DraftExpense = {
            ...expense,
            amount: amountNumber
        }

        if (state.editingId) {
            dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expenseToSave } } })
        } else {
            dispatch({ type: 'add-expense', payload: { expense: expenseToSave } })
        }

        //reiniciar state
        setExpense({
            amount: '' as unknown as number,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)

    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">{state.editingId === '' ? "Nuevo Gasto" : "Modificar Gasto"}</legend>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl"
                >Nombre Gasto:</label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder=" Añade el nombre del gasto"
                    className="bg-slate-100 rounded-lg p-2"
                    name="expenseName"
                    onChange={handleChange}
                    value={expense.expenseName}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >Cantidad:</label>
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    id="amount"
                    placeholder=" Añade la cantiad del gasto.(Ej:300)"
                    className="bg-slate-100 rounded-lg p-2"
                    name="amount"
                    onChange={handleChange}
                    value={expense.amount}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-xl"
                >Categoria:</label>
                <CategoryFilter
                    value={expense.category}
                    onChange={(id) => setExpense({ ...expense, category: id })}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="ammount"
                    className="tetx-xl"
                >Fecha Gasto:</label>
                <DatePicker
                    className="bg-slate-100 p-2 rounded-lg w-full border-none outline-none"
                    onChange={handleChangeDate}
                    value={expense.date}
                />
            </div>
            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editingId === '' ? "Registrar Gasto" : "Actualizar Gasto"}
            />

        </form>
    )
}
