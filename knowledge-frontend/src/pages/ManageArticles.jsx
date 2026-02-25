import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArticleService from '../services/ArticleService';
import Navbar from '../components/Navbar';

const ManageArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const navigate = useNavigate();

  const fetchMyArticles = async () => {
    setLoading(true);
    try {
      const response = await ArticleService.getMyArticles({
        page: currentPage,
        size: 10
      });
      
      if (response && response.success) {
        setArticles(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyArticles();
  }, [currentPage]);


  const handleDelete = async () => {
    try {
      await ArticleService.deleteArticle(deleteModal.id);
      setDeleteModal({ show: false, id: null });
      fetchMyArticles(); // Refresh list
    } catch (error) {
      alert('Failed to delete article: ' + error.message);
    }
  };


  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 pt-24 md:pt-32">
      <Navbar />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
              Manage <span className="text-blue-500">Articles.</span>
            </h1>
            <p className="text-zinc-500">Review, edit, or remove your published work.</p>
          </div>
          <Link 
            to="/create-article"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
          >
            Create New Article
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="h-20 bg-zinc-900/50 border border-white/5 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : articles.length > 0 ? (
          <>
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="px-6 py-4 text-sm font-bold text-zinc-400 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-4 text-sm font-bold text-zinc-400 uppercase tracking-wider hidden md:table-cell">Category</th>
                    <th className="px-6 py-4 text-sm font-bold text-zinc-400 uppercase tracking-wider hidden sm:table-cell">Date</th>
                    <th className="px-6 py-4 text-sm font-bold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div 
                          onClick={() => navigate(`/article/${article.id}`)}
                          className="font-bold text-white group-hover:text-blue-400 transition-colors truncate max-w-xs md:max-w-md cursor-pointer"
                        >
                          {article.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="px-2 py-1 text-[10px] font-bold bg-zinc-800 text-zinc-400 rounded-md border border-white/5 uppercase">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-500 text-sm hidden sm:table-cell">
                        {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <button 
                            onClick={() => navigate(`/edit-article/${article.id}`)}
                            className="p-2 text-zinc-500 hover:text-blue-400 transition-colors"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => setDeleteModal({ show: true, id: article.id })}
                            className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-4 mt-8">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  className="px-6 py-2 bg-zinc-900 border border-white/10 rounded-xl hover:bg-zinc-800 disabled:opacity-50 transition-colors"
                >
                  Previous
                </button>
                <span className="text-zinc-500 text-sm">Page {currentPage + 1} of {totalPages}</span>
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
          <div className="text-center py-20 bg-zinc-900/40 rounded-2xl border border-white/5">
            <p className="text-zinc-500 mb-6">You haven't written any articles yet.</p>
            <Link to="/create-article" className="px-6 py-3 bg-white text-zinc-950 font-bold rounded-xl hover:bg-zinc-200 transition-colors">
              Write Your First Article
            </Link>
          </div>
        )}


      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Delete Article?</h3>
            <p className="text-zinc-400 mb-8 text-sm">This action cannot be undone. Are you sure you want to remove this article permanently?</p>
            <div className="flex space-x-4">
              <button 
                onClick={() => setDeleteModal({ show: false, id: null })}
                className="flex-1 py-3 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-500 transition-colors"
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageArticles;
