import { Draggable } from "@hello-pangea/dnd";
import { TaskModel } from "../models/TaskModel";
import { useContext, useState } from "react";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { getTaskBorderColor } from "../utils/getTaskBorderColor";
import { MdArrowDropDown, MdArrowDropUp, MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { TasksContext } from "../contexts/TasksContext";
import { toast } from "react-toastify";
import { togglePosition as toggleTaskPosition } from "../services/TaskService";

type shiftTaskProps = {
    action: 'up' | 'down',
}

export function Task(task: TaskModel) {
    const {
        id,
        name,
        position
    } = task;

    const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

    const { tasks, setTasks } = useContext(TasksContext);

    async function shiftTask({ action }: shiftTaskProps) {
        let newPosition = null;

        if (action == 'up') {
            if (task.position == 1) return;
            newPosition = task.position - 1;
        } else {
            if (task.position == tasks.length) return;
            newPosition = task.position + 1;
        }

        try {
            const tasks = await toggleTaskPosition(task.id, newPosition);
            setTasks(tasks);
        } catch (error: Error) {
            toast.error(error.message, {
                position: 'bottom-right'
            })
        }
    }

    return (
        <>
            <Draggable draggableId={`${id}`} index={position}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-4 bg-[#111] border-solid border-2 ${getTaskBorderColor(task)} rounded-xl cursor-move flex items-center justify-between gap-5`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col justify-between">
                                <button
                                    className="disabled:cursor-not-allowed"
                                    disabled={task.position == 1}
                                    onClick={() => shiftTask({ action: 'up' })}
                                >
                                    <MdArrowDropUp size={22} />
                                </button>

                                <button
                                    className="disabled:cursor-not-allowed"
                                    disabled={task.position == tasks.length}
                                    onClick={() => shiftTask({ action: 'down' })}
                                >
                                    <MdArrowDropDown size={22} />
                                </button>
                            </div>
                            <h2 className="mobile:text-sm">{name}</h2>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                className="p-1 hover:bg-[#444] rounded-lg transition"
                                onClick={() => setIsOpenEditModal(true)}
                            >
                                <MdOutlineEdit size={16} />
                            </button>

                            <button
                                className="p-1 hover:bg-[#444] rounded-lg transition"
                                onClick={() => setIsOpenDeleteModal(true)}
                            >
                                <FaRegTrashAlt size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </Draggable>

            <EditTaskModal
                task={task}
                isOpen={isOpenEditModal}
                setIsOpen={setIsOpenEditModal}
            />

            <DeleteTaskModal
                task={task}
                isOpen={isOpenDeleteModal}
                setIsOpen={setIsOpenDeleteModal}
            />
        </>
    );
}