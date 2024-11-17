import { createContext, ReactNode, useState } from "react";

type FormContextData = {
    nameInputError: string;
    setNameInputError: (name: string) => void;

    priceInputError: string;
    setPriceInputError: (price: string) => void;

    expireInInputError: string;
    setExpireInInputError: (expireIn: string) => void;
}

export const FormContext = createContext({} as FormContextData)

type FormContextProviderProps = {
    children: ReactNode
}

export function FormContextProvider({ children }: FormContextProviderProps) {
    const [nameInputError, setNameInputError] = useState('');
    const [priceInputError, setPriceInputError] = useState('');
    const [expireInInputError, setExpireInInputError] = useState('');

    return (
        <FormContext.Provider
            value={{
                nameInputError,
                setNameInputError,
                priceInputError,
                setPriceInputError,
                expireInInputError,
                setExpireInInputError
            }}>
            {children}
        </FormContext.Provider>
    );
}