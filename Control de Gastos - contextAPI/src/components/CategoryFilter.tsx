import { categories } from "../data/categories";
import type { Category } from "../types";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

type CategoryFilterProps = {
    value: Category['id']
    onChange: (id: Category['id']) => void
    placeholder?: string
    showAllOption?: boolean
    allOptionText?: string
}

export default function CategoryFilter({
    value,
    onChange,
    placeholder = "-- Seleccione una categoría --",
    showAllOption = false,
    allOptionText = "-- Todas las Categorías --"
}: CategoryFilterProps) {

    const selectedCategory = categories.find(cat => cat.id === value)

    return (
        <Listbox
            value={value}
            onChange={onChange}
        >
            <div className="relative w-full">
                <ListboxButton className="w-full bg-slate-100 p-3 rounded-lg text-left text-slate-700 flex justify-between items-center outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                    <span className="truncate">
                        {selectedCategory
                            ? selectedCategory.name
                            : (showAllOption ? allOptionText : placeholder)
                        }
                    </span>
                    <ChevronDownIcon className="w-5 h-5 text-slate-500 shrink-0 ml-2" />
                </ListboxButton>

                <ListboxOptions className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-100 p-1 outline-none max-h-60 overflow-auto">
                    {showAllOption && (
                        <ListboxOption
                            value=""
                            className={({ active, selected }) =>
                                `cursor-pointer select-none p-2.5 rounded-lg flex items-center justify-between transition-colors ${
                                    active ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-500'
                                } ${selected ? 'font-bold text-blue-600' : ''}`
                            }
                        >
                            {({ selected }) => (
                                <>
                                    <span>{allOptionText}</span>
                                    {selected && <CheckIcon className="w-5 h-5 text-blue-600" />}
                                </>
                            )}
                        </ListboxOption>
                    )}

                    {categories.map((category) => (
                        <ListboxOption
                            key={category.id}
                            value={category.id}
                            className={({ active, selected }) =>
                                `cursor-pointer select-none p-2.5 rounded-lg flex items-center justify-between transition-colors ${
                                    active ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700'
                                } ${selected ? 'font-bold text-blue-600' : ''}`
                            }
                        >
                            {({ selected }) => (
                                <>
                                    <span>{category.name}</span>
                                    {selected && <CheckIcon className="w-5 h-5 text-blue-600" />}
                                </>
                            )}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}
