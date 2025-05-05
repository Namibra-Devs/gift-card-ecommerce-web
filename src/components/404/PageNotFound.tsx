import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      <div className="max-w-md w-full ">
        {/* Illustration */}
        <div className="mb-8">
          <svg
            className="w-40 h-40 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-800 mb-3">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <FiArrowLeft className="inline" />
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <FiHome className="inline" />
            Return Home
          </button>
        </div>
      </div>

      {/* Optional: Footer */}
      <div className="mt-8 text-sm text-gray-500">
        <p>Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact support</a></p>
      </div>
    </div>
  );
};

export default PageNotFound;