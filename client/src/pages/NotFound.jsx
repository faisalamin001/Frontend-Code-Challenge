import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='py-20 px-4 text-center text-white bg-slate-700'>
      <p className='text-8xl font-extrabold'>404</p>
      <p className='text-6xl text-gray-400'>Page not found</p>
      <button
        onClick={() => navigate('/')}
        className='bg-blue-600 rounded px-6 py-2 hover:bg-blue-900 mt-8'
      >
        Back to Home
      </button>
    </div>
  );
}
