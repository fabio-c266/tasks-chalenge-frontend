import { createContext, ReactNode, useState } from "react"
import { TaskModel } from "../models/TaskModel";

type TasksContextData = {
    tasks: TaskModel[];
    setTasks: (tasks: TaskModel[]) => void;
    updateTask: (task: TaskModel) => void;
    deleteTask: (taskId: number) => void;
}

type TasksContextsProviderProps = {
    children: ReactNode
}

export const TasksContext = createContext({} as TasksContextData);

export function TasksContextProvider({ children }: TasksContextsProviderProps) {
    const [tasks, setTasks] = useState<TaskModel[]>([]);

    function updateTask(newTaskData: TaskModel) {
        const newList = [...tasks.filter(task => task.id != newTaskData.id)]
        newList.splice(newTaskData.position - 1, 0, newTaskData)

        setTasks(newList)
    }

    function deleteTask(taskId: number) {
        const newList = [...tasks.filter(task => task.id != taskId)]
        setTasks(newList);
    }

    return (
        <TasksContext.Provider
            value={{
                tasks,
                setTasks,
                updateTask,
                deleteTask
            }}
        >
            {children}
        </TasksContext.Provider>
    );
}