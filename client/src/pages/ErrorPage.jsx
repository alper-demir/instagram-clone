import { Link } from 'react-router-dom';

const ErrorPage = ({ errorCode = 404, errorMessage = "Page Not Found" }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-indigo-50">
            <div className="w-full max-w-md px-6 py-8 mx-auto text-center">
                <div className="border-2 border-gray-200 rounded-lg p-6 mb-6">
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">
                        {errorCode}
                    </h1>
                    <p className="text-2xl text-gray-600 mb-6">
                        {errorMessage}
                    </p>
                </div>

                <p className="text-gray-500 text-md mb-6">
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>

                <div className="flex justify-center space-x-4">
                    <Link
                        to="/"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Go to Home
                    </Link>
                    <Link
                        to="/explore"
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        Explore
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;