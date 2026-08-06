import { useBudget } from "../hooks/useBudget";
import CategoryFilter from "./CategoryFilter";

export default function FilterByCategory() {
    const { state, dispatch } = useBudget()

    return (
        <div className="bg-white w-full shadow-lg rounded-4xl p-5">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <div className="flex flex-1 items-center gap-2">
                        <label htmlFor="category" className="text-xl">Filtrar Gastos</label>
                        <CategoryFilter
                            value={state.currentCategory}
                            onChange={(id) => dispatch({ type: 'add-filter-category', payload: { id } })}
                            showAllOption={true}
                            allOptionText="-- Todas las Categorías --"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}
