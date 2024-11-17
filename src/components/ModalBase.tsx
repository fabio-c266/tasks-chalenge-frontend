import { useContext } from "react";
import { Shadow } from "./Shadow";
import { FormContext } from "../contexts/FormContext";

type ModalBaseProps = {
    title: string,
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    children: JSX.Element
}

export function ModalBase({ title, isOpen, setIsOpen, children }: ModalBaseProps) {
    const {
        setNameInputError,
        setPriceInputError,
        setExpireInInputError
    } = useContext(FormContext);

    function handleCloseModal() {
        setIsOpen(false)

        setNameInputError('')
        setPriceInputError('')
        setExpireInInputError('')
    }

    return (
        <div className={`${isOpen ? 'visible' : 'hidden'}`}>
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-[40vw] tablet:w-[60vw] mobile:w-[92vw] h-fit p-8 rounded-lg bg-[#333]"
            >
                <div className="flex items-center justify-between mb-5">
                    <h1 className="font-bold text-2xl">{title}</h1>
                    <button
                        className="text-2xl"
                        onClick={() => handleCloseModal()}
                    >X
                    </button>
                </div>
                {children}
            </div>

            <Shadow />
        </div>
    );
}