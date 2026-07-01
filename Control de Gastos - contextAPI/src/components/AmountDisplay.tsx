import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label: string
    amount: number
}
export default function AmountDisplay({label, amount} : AmountDisplayProps) {
  return (
    <p className={`text-2xl font-bold ${label === "Disponible" ? 'text-lime-300': label === "Gastado" ? 'text-red-500' : "text-blue-400"}`}>
        {label}: {' '}
        <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  )
}
