import DevlingoLoader from '@/assets/images/devlingo-loader.png'

interface LoadingScreenProps {
    isFadingOut?: boolean
}

const LoadingScreen = ({ isFadingOut = false }: LoadingScreenProps) => {
    return (
        <div className={`fixed inset-0 bg-[#7a0dbf] flex flex-col items-center justify-center ${isFadingOut ? 'animate-fadeOut' : ''
            }`}>
            <div className="animate-float">
                <img
                    src={DevlingoLoader}
                    alt="Devlingo"
                    className="w-36 h-36 object-contain"
                />
            </div>
            <h1 className="text-white text-5xl font-bold mt-12 tracking-wider">
                devlingo
            </h1>
        </div>
    )
}

export default LoadingScreen
