import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export default function BudgetForm() {

    const [budget, setBudget] = useState('')
    const { dispatch } = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        if (/^\d*$/.test(val)) {
            setBudget(val)
        }
    }

    const isValid = useMemo(() => { 
        return isNaN(+budget) || +budget <= 0
    }, [budget])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'define-budget', payload: { budget: +budget } })
    }

    return (
        <form className="space-y-5 font-inter" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                    Definir Presupuesto
                </label>
                <input 
                    id="budget"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="w-full bg-white border border-slate-400 p-2 rounded-lg"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
                <input 
                    type="submit" 
                    value="Definir Presupuesto"
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase rounded-lg disabled:opacity-40"
                    disabled={isValid}
                />
            </div>
        </form>
    )
}
