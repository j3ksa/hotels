import { FaSpinner } from 'react-icons/fa'

const Loading = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center text-black">
            <FaSpinner
                className={`animate-spin text-6xl`}
            />
        </div>
    )
}

export default Loading