import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <Link to="/" className="bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded">
        Go Home
      </Link>
    </div>
  );
}
