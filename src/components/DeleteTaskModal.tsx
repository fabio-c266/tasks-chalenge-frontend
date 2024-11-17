import { useContext, useState } from "react";
import { TaskModel } from "../models/TaskModel";
import { ModalBase } from "./ModalBase";
import { TasksContext } from "../contexts/TasksContext";
import { toast } from "react-toastify";
import { remove as removeTask } from "../services/TaskService";

type DeleteTaskModalProps = {
    task: TaskModel;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export function DeleteTaskModal({
    task,
    isOpen,
    setIsOpen
}: DeleteTaskModalProps) {
    const { deleteTask: deleteTaskInState } = useContext(TasksContext);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

    async function handlerDeleteTask() {
        setIsButtonDisabled(true)

        try {
            await removeTask(task.id);
            deleteTaskInState(task.id);
        } catch (error: Error) {
            toast.error(error.message, {
                position: 'bottom-right'
            })
        } finally {
            setIsButtonDisabled(false)
            setIsOpen(false)
        }
    }

    return (
        <ModalBase title="Deleta tarefa" isOpen={isOpen} setIsOpen={setIsOpen}>
            <div>
                <p>Você realmente deseja deletar a tarefa <span className="font-bold">{task.name}</span>? Ação irreversível.</p>
                <button
                    onClick={() => handlerDeleteTask()}
                    disabled={isButtonDisabled}
                    className="mt-5 p-2 rounded-lg font-bold bg-red-700 hover:opacity-80 transition"
                >
                    Confirmar
                </button>
            </div>
        </ModalBase>
    );
}