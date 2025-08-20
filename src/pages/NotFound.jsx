import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-[#240046] text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl text-white mb-4">Page Not Found</h2>
      <p className="text-gray-300 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF9E00] to-[#FFB347] text-[#240046] font-semibold tracking-wide text-lg px-6 py-3 rounded-lg shadow-lg ring-2 ring-transparent hover:ring-[#FF9E00] hover:from-[#FFA931] hover:to-[#FFD580] hover:scale-105 transform transition duration-300 ease-in-out"
      >
        <FaArrowLeft /> Back to Home
      </Link>
    </div>
  );
}
