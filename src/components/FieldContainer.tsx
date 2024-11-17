import { ReactNode } from "react"

type FieldContainerProps = {
    children: ReactNode
}

export function FieldContainer({ children }: FieldContainerProps) {
    return (
        <div className="flex flex-col gap-2">
            {children}
        </div>
    )
}