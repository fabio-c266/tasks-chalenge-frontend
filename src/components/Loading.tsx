import LoadingGif from '../assets/loading.gif'

export function Loading() {
    return <div className='mt-[20vh]'>
        <img
            className='m-auto w-20 h-20'
            src={LoadingGif}
            alt="Carregando"
        />
    </div>
}