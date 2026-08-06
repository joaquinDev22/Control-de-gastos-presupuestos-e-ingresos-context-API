import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {

    const { state, dispatch, totalExpenses, remainingBudget } = useBudget()

    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center font-bold">
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}% Gastado`}
                    styles={buildStyles({
                        pathColor: percentage === 100 ? '#DC2626' : percentage > 50 ? '#EAB308' : '#3B82F6',
                        trailColor: '#F3F5F6',
                        textColor: percentage === 100 ? '#DC2626' : percentage > 50 ? '#EAB308' : '#3B82F6',
                        textSize: 8
                    })}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <AmountDisplay
                    label="Presupuesto"
                    amount={state.budget}
                />
                <AmountDisplay
                    label="Disponible"
                    amount={remainingBudget}
                />
                <AmountDisplay
                    label="Gastado"
                    amount={totalExpenses}
                />
                <button className="bg-pink-600 w-full p-2 text-white font-bold rounded-lg uppercase hover:cursor-pointer hover:bg-pink-700 transition-colors duration-200"
                    onClick={() => dispatch({ type: 'reset-app' })}>
                    Restear App
                </button>
            </div>
        </div>
    )
}
