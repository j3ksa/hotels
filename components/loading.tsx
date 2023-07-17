import { FaSpinner } from 'react-icons/fa'

const Loading = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center text-white bg-gradient-to-br from-[#1b1c5e] via-[#1b1c5ee8] to-[#1b1c5ed3]">
            <FaSpinner
                className={`animate-spin text-6xl`}
            />
        </div>
    )
}

export default Loading