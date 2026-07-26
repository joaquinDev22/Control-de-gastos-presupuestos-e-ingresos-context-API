import type { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

export default function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <p className="bg-red-400 border border-red-600 rounded-xl p-2 text-white font-bold text-sm text-center">
        {children}
    </p>
  )
}
