import { useContext, useEffect, useState } from "react";
import { TaskModel } from "../models/TaskModel";
import { Task } from "./Task";
import { Loading } from "./Loading";
import { NoTasks } from "./NoTasks";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { getAll as getAllTasks, togglePosition as toggleTaskPosition } from "../services/TaskService";
import { toast } from "react-toastify";
import { TasksContext } from "../contexts/TasksContext";


export function Tasks() {
    const {
        tasks,
        setTasks,
    } = useContext(TasksContext);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function handleFetchUserTasks(): Promise<TaskModel[] | null> {
        try {
            return await getAllTasks();
        } catch (error: Error) {
            toast.error(error.message, {
                position: 'bottom-right'
            });

            return null;
        }
    }

    async function handleDragEnd(result: any) {
        const sourceIndex = result.source?.index ?? null;
        const destinationIndex = result.destination?.index ?? null;

        if (!destinationIndex || sourceIndex == destinationIndex) return;

        const taskId = result.draggableId;

        try {
            const data = await toggleTaskPosition(taskId, destinationIndex);
            setTasks(data);
        } catch (error: Error) {
            toast.error(error.message, {
                position: 'bottom-right'
            })
        }
    }

    useEffect(() => {
        setIsLoading(true);

        (async () => {
            const data = await handleFetchUserTasks();

            if (data != null) {
                setTasks(data);
                setIsLoading(false);
            }
        })()
    }, [setTasks])

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks" direction="vertical" isDropDisabled={tasks.length < 2}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex flex-col gap-3"
                    >
                        {
                            isLoading ? <Loading /> : (
                                tasks.length < 1 ? <NoTasks /> : tasks.map(task => <Task key={task.id} {...task} />)
                            )
                        }
                        {
                            provided.placeholder
                        }
                    </div>
                )}
            </Droppable>
        </DragDropContext >
    );
}