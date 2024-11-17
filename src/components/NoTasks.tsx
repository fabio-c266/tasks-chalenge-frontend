import EmptyFiles from '../assets/empty-files.png'

export function NoTasks() {
    return (
        <div className="flex gap-3 flex-col items-center justify-center text-center mt-[20vh]">
            <img
                className='w-14 h-14'
                src={EmptyFiles}
                alt="Sem tarefas"
            />

            <h1 className='text-2xl'>Sem tarefas</h1>
        </div>
    );
}