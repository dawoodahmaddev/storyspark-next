import { useState, useEffect } from "react";


interface StoryResponseProps {
    response: string[];
    onBack: () => void;
}

export default function StoryResponse({ response, onBack }: StoryResponseProps) {

    const [currentPage, SetCurrentPage] = useState<number>(0);
    const [animation, setAnimation] = useState<"flip-left" | "flip-right" | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Simulate a delay for loading response
    useEffect(() => {
        if (response && response.length > 0) {
            const timer = setTimeout(() => setLoading(false), 1000); // Simulated loading time
            return () => clearTimeout(timer);
        }
    }, [response]);

    const handleNext = () => {
        if (currentPage < response.length - 1) {
            setAnimation("flip-right");
            setTimeout(() => SetCurrentPage((prev) => prev + 1), 400);
        }
    }

    const handlePrev = () => {
        if (currentPage > 0) {
            setAnimation("flip-left");
            setTimeout(() => SetCurrentPage((prev) => prev - 1), 400);
        } else {
            onBack();
        }
    }
    if (loading) {
        return (
            <div className="font-sans min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                <p className="text-gray-700 text-lg">Loading your story...</p>
            </div>
        );
    }

    return (
        <div className="font-sans min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">

            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Generated Story</h2>

            <div className="relative bg-white w-full max-w-lg p-6 rounded-md shadow-lg border">
                
                {currentPage > 0 && (
                    <button
                        onClick={handlePrev}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-all z-10"
                    >
                        ←
                    </button>
                )}
                
                <div
                    className={`w-full p-6 bg-white border border-gray-300 rounded-lg shadow-xl transition-all duration-500 transform ${
                        animation === "flip-left"
                            ? "animate-flipLeft"
                            : animation === "flip-right"
                            ? "animate-flipRight"
                            : ""
                    }`}
                    onAnimationEnd={() => setAnimation(null)}
                >
                
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Story {currentPage + 1}</h3>
                
                    <p className="text-gray-700 leading-relaxed p-2">{response[currentPage]}</p>
                
                </div>

                {currentPage < response.length - 1 && (
                    <button
                        onClick={handleNext}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-all z-10"
                    >
                        →
                    </button>
                )}
            </div>

            <button
                onClick={onBack}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
            >

                Back to Prompt

            </button>

        </div>
    )
}