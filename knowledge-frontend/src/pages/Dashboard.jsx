import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ArticleCard from '../components/ArticleCard';
import ArticleService from '../services/ArticleService';

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const categories = ['All', 'Tech', 'AI', 'Backend', 'Frontend', 'DevOps', 'Cloud'];

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        size: 9,
        search: searchTerm || null,
        category: selectedCategory === 'All' ? null : selectedCategory,
      };
      
      const response = await ArticleService.getAllArticles(params);
      
      if (response && response.success) {
        // Spring Data Page structure: data.content, data.totalPages
        setArticles(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchArticles();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedCategory, currentPage]);


  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 pt-24 md:pt-32">
      <Navbar />

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Discover <span className="text-blue-500">Knowledge.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Explore the latest technical insights and share your expertise with the community.
          </p>
        </div>


        {/* Search & Filter Bar */}
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-2 rounded-2xl mb-12 flex flex-col lg:flex-row items-center gap-2">
          {/* Search Input */}
          <div className="relative w-full lg:w-96">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-800/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center w-full overflow-x-auto no-scrollbar py-2 px-2 gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap border ${
                  selectedCategory === category 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-zinc-800/50 border-transparent text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Article Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-zinc-900/50 border border-white/5 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-4 mt-16">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  className="px-6 py-2 bg-zinc-900 border border-white/10 rounded-xl hover:bg-zinc-800 disabled:opacity-50 transition-colors"
                >
                  Previous
                </button>
                <span className="text-zinc-500">Page {currentPage + 1} of {totalPages}</span>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="px-6 py-2 bg-zinc-900 border border-white/10 rounded-xl hover:bg-zinc-800 disabled:opacity-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-900 rounded-full mb-4 border border-white/5">
              <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">No articles found</h3>
            <p className="text-zinc-500">Try adjusting your search or category filter.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
