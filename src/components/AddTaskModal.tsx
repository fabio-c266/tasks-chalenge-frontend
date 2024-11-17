import { FormEvent, useContext, useState } from "react";
import { ModalBase } from "./ModalBase";
import { toast } from "react-toastify";
import { save as saveTask } from "../services/TaskService";
import { TasksContext } from "../contexts/TasksContext";
import { Label } from "./Label";
import { FieldContainer } from "./FieldContainer";
import { FormContext } from "../contexts/FormContext";
import { validateDataToCreateTask } from "../validations/validateDataToCreateTask";
import { formatCurrency } from "../utils/formatCurrency";

type AddTaskModalProps = {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
}

export function AddTaskModal({
    isOpen,
    setIsOpen
}: AddTaskModalProps) {
    const [nameInput, setNameInput] = useState<string>('');
    const [priceInput, setPriceInput] = useState<string>('');
    const [expireInInput, setExpireInInput] = useState<string>('');

    const {
        nameInputError,
        setNameInputError,
        priceInputError,
        setPriceInputError,
        expireInInputError,
        setExpireInInputError
    } = useContext(FormContext);

    const [isFormSubitting, setIsFormSubitting] = useState<boolean>(false);

    const {
        tasks,
        setTasks
    } = useContext(TasksContext);

    async function handlePriceTyped(price: string) {
        const inputFormatted = formatCurrency(price);
        setPriceInput(inputFormatted)
    }

    async function handleAddTask(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const name = nameInput;
        const price = Number(priceInput)
        const expireIn = expireInInput

        const validateResponse = validateDataToCreateTask({ name, price, expireIn })

        if (validateResponse) {
            if (validateResponse.field == 'name') {
                return setNameInputError(validateResponse.message)
            }

            if (validateResponse.field == 'price') {
                return setPriceInputError(validateResponse.message)
            }

            if (validateResponse.field == 'expireIn') {
                return setExpireInInputError(validateResponse.message)
            }
        }

        const expireAt = new Date(expireIn);

        const brazilianOffset = -3;
        expireAt.setHours(expireAt.getHours() + brazilianOffset)
        const formattedDate = expireAt.toISOString().slice(0, 19).replace("T", " ");

        setIsFormSubitting(true);

        try {
            const task = await saveTask({
                name,
                price,
                expireAt: formattedDate
            });

            setTasks([...tasks, task]);

            setNameInput('');
            setPriceInput('');
            setExpireInInput('');
        } catch (error) {
            toast.error(error.message, {
                position: 'bottom-right'
            });
        } finally {
            setIsFormSubitting(false);
            setIsOpen(false)
        }
    }

    return (
        <ModalBase title="Adicionar tarefa" isOpen={isOpen} setIsOpen={setIsOpen}>
            <form
                onSubmit={handleAddTask}
                className="text-black flex flex-col gap-5"
            >
                <FieldContainer>
                    <Label inputId="name-input" inputName="Nome" />

                    <input
                        id="name-input"
                        className="p-2 rounded-lg bg-white w-full"
                        value={nameInput}
                        onChange={event => setNameInput(event.target.value)}
                        onFocus={() => nameInputError.length > 0 ? setNameInputError('') : ''}
                        type="text"
                        step="00.1"
                        placeholder="Exemplo: Comprar café"
                    />

                    <p className="text-red-600">{nameInputError}</p>
                </FieldContainer>

                <FieldContainer>
                    <Label inputId="price-input" inputName="Preço" />

                    <input
                        id="price-input"
                        className="p-2 rounded-lg bg-white w-full"
                        value={priceInput}
                        onChange={event => handlePriceTyped(event.target.value)}
                        onFocus={() => priceInputError.length > 0 ? setPriceInputError('') : ''}
                        type="text"
                        placeholder="Exemplo: 29,99"
                    />

                    <p className="text-red-600">{priceInputError}</p>
                </FieldContainer>

                <FieldContainer>
                    <Label inputId="expire-in-input" inputName="Prazo" />

                    <input
                        id="expire-in-input"
                        className="p-2 rounded-lg bg-white w-full"
                        value={expireInInput}
                        onChange={event => setExpireInInput(event.target.value)}
                        onFocus={() => expireInInputError.length > 0 ? setExpireInInputError('') : ''}
                        type="datetime-local"
                    />

                    <p className="text-red-600">{expireInInputError}</p>
                </FieldContainer>

                <button
                    disabled={isFormSubitting}
                    className="hover:opacity-80 transition text-white font-bold p-2 bg-blue-500 rounded-lg mt-2 disabled:cursor-not-allowed disabled:opacity-60"
                >Cadastrar</button>
            </form>
        </ModalBase>
    );
}