import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4">
      <Navbar />

      <main className="text-center relative px-4 mt-20 md:mt-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 md:bg-blue-500/20 rounded-full blur-[80px] md:blur-[120px] -z-10"></div>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-6 tracking-tight">
          Share Your <span className="text-blue-500">Edge.</span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed px-2">
          The premium knowledge-sharing platform for modern developers. 
          Learn, build, and grow together in a stunning collaborative environment.
        </p>
        <Link 
          to="/articles" 
          className="inline-block px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-base md:text-lg font-bold shadow-2xl shadow-blue-500/20 hover:scale-105 transition-transform"
        >
          Explore the Feed
        </Link>
      </main>


    </div>
  );
};

export default Home;
