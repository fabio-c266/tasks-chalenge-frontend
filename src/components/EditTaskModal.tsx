import { FormEvent, useContext, useEffect, useState } from "react";
import { TaskModel } from "../models/TaskModel";
import { FieldContainer } from "./FieldContainer";
import { Label } from "./Label";
import { ModalBase } from "./ModalBase";
import { FormContext } from "../contexts/FormContext";
import { validateDataToCreateTask } from "../validations/validateDataToCreateTask";
import { update as updateTask } from "../services/TaskService";
import { toast } from "react-toastify";
import { TasksContext } from "../contexts/TasksContext";
import { formatCurrency } from "../utils/formatCurrency";

type EditTaskModalProps = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    task: TaskModel
}

export function EditTaskModal({
    isOpen,
    setIsOpen,
    task
}: EditTaskModalProps) {
    const [nameInput, setNameInput] = useState<string>(task.name);
    const [priceInput, setPriceInput] = useState<string>(task.price.toFixed(2));
    const [expireInInput, setExpireInInput] = useState<string>(task.expire_at);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const {
        nameInputError,
        setNameInputError,
        priceInputError,
        setPriceInputError,
        expireInInputError,
        setExpireInInputError
    } = useContext(FormContext);

    const {
        updateTask: updateTaskInState
    } = useContext(TasksContext);

    async function handlePriceTyped(price: string) {
        const inputFormatted = formatCurrency(price);
        setPriceInput(inputFormatted)
    }

    async function handleEditTask(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const name = nameInput
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

        const updateData = {
            id: task.id,
            name: task.name == name ? null : name,
            price: task.price == price ? null : price,
            expireAt: task.expire_at == formattedDate ? null : formattedDate
        }

        try {
            const taskUpdated = await updateTask(updateData);
            updateTaskInState(taskUpdated);
        } catch (error: Error) {
            toast.error(error.message, {
                position: 'bottom-right'
            })
        } finally {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        const hasChanged = nameInput != task.name || priceInput != task.price.toFixed(2) || expireInInput != task.expire_at

        setIsButtonDisabled(!hasChanged);
    }, [nameInput, priceInput, expireInInput, task])

    return (
        <ModalBase
            title="Editar tarefa"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <form
                onSubmit={handleEditTask}
                className="text-black flex flex-col gap-5"
            >
                <FieldContainer>
                    <Label inputId="edit-name-input" inputName="Nome" />

                    <input
                        id="edit-name-input"
                        className="p-2 rounded-lg bg-white w-full"
                        value={nameInput}
                        onChange={(event) => setNameInput(event.target.value)}
                        onFocus={() => setNameInputError('')}
                        type="text"
                    />

                    <p className="text-red-600">{nameInputError}</p>
                </FieldContainer>

                <FieldContainer>
                    <Label inputId="edit-price-input" inputName="Preço" />

                    <input
                        id="edit-price-input"
                        className="p-2 rounded-lg bg-white w-full"
                        value={priceInput}
                        onChange={(event) => handlePriceTyped(event.target.value)}
                        onFocus={() => setPriceInputError('')}
                        type="text"
                    />

                    <p className="text-red-600">{priceInputError}</p>
                </FieldContainer>

                <FieldContainer>
                    <Label inputId="edit-expire-in-input" inputName="Prazo" />

                    <input
                        id="edit-expire-in-input"
                        className="p-2 rounded-lg bg-white w-full"
                        value={expireInInput}
                        onChange={(event) => setExpireInInput(event.target.value)}
                        onFocus={() => setExpireInInputError('')}
                        type="datetime-local"
                    />

                    <p className="text-red-600">{expireInInputError}</p>
                </FieldContainer>

                <button
                    disabled={isButtonDisabled}
                    className="hover:opacity-80 transition text-white font-bold p-2 bg-blue-500 rounded-lg mt-2 disabled:cursor-not-allowed disabled:opacity-60"
                >Salvar</button>
            </form>
        </ModalBase>
    )
}