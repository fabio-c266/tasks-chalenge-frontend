import { useState } from 'react'
import { Tasks } from './components/Tasks'
import { AddTaskModal } from './components/AddTaskModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TasksContextProvider } from './contexts/TasksContext';
import { FormContextProvider } from './contexts/FormContext';

export function App() {
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);

  return (
    <TasksContextProvider>
      <FormContextProvider>
        <AddTaskModal isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between p-5 rounded-lg bg-[#111]">
            <h1 className="text-2xl mobile:text-base font-bold mobile:font-extrabold">Minhas tarefas</h1>
            <button
              className='p-3 mobile:p-2 mobile:text-xs bg-[#333] rounded-lg font-semibold'
              onClick={() => setIsOpenAddModal(true)}
            >Adicionar tarefa</button>
          </div>
          <Tasks />
        </div>
      </FormContextProvider>

      <ToastContainer />
    </TasksContextProvider>
  )
}
