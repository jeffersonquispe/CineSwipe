import React from 'react';
import { MovieProvider } from './context/movies/MovieContext';
import { Discovery } from './pages/Discovery/Discovery';

const App: React.FC = () => {
  return (
    <MovieProvider>
      <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-indigo-500 selection:text-white">
        <header className="py-6 text-center border-b border-gray-800 bg-gray-900/80 backdrop-blur-md fixed top-0 w-full z-10">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 tracking-wide">
            CineSwipe
          </h1>
        </header>
        <main className="flex justify-center items-center h-screen pt-20">
          <Discovery />
        </main>
      </div>
    </MovieProvider>
  );
};

export default App;
