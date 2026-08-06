import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"


export default function ExpenseList() {
    const {state} = useBudget()

    const filterExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses

    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses])

  return (
    <div className="bg-white max-w-3xl mx-auto shadow-lg rounded-xl p-5 mt-10">
        {isEmpty ? <p className="text-gray-600 text-center text-2xl font-bold">No hay gastos</p> : (
            <>
                <p className="text-gray-600 text-2xl font-bold text-center my-5">Listado de Gastos</p>
                {filterExpenses.map(expense => (
                    <ExpenseDetail
                        key={expense.id}
                        expense={expense}
                    />
                ))} 
            </>
        )}

    </div>
  )
}
