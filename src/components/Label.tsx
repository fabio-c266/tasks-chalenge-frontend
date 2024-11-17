type LabelProps = {
    inputId: string;
    inputName: string;
}

export function Label({ inputId, inputName }: LabelProps) {
    return (
        <label
            className=""
            htmlFor={inputId}
        >{inputName}</label>
    )
}