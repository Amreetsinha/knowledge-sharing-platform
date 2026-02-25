import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ArticleService from '../services/ArticleService';
import Navbar from '../components/Navbar';

const ArticleView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await ArticleService.getArticleById(id);
        if (response && response.success) {
          console.log(response.data);
          
          setArticle(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching article:', error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);


  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4 text-zinc-600">Article Not Found</h1>
        <Link to="/articles" className="text-blue-400 hover:text-blue-300 transition-colors underline">Return to Feed</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-20">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumbs/Meta */}
        <div className="flex items-center space-x-2 text-zinc-500 text-sm mb-8">
          <Link to="/articles" className="hover:text-blue-400 transition-colors">Articles</Link>
          <span>/</span>
          <span className="text-zinc-400">{article.category}</span>
        </div>

        {/* Title & Author */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center justify-between py-6 border-y border-white/5">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white uppercase shadow-lg shadow-blue-500/20 ">
                {(article.authorName || article.author || 'A')[0]}
              </div>
              <div>
                <div className="font-bold text-lg text-white">{article.authorName || article.author || 'Anonymous'}</div>
                <div className="text-zinc-500 text-sm">
                  Published on {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : 'Recently'}
                </div>
              </div>
            </div>
            
            <button className="text-zinc-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none mb-12">
          <div 
            className="text-zinc-300 leading-relaxed quill-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>


        {/* Footer Meta */}
        <div className="pt-12 border-t border-white/5">
          <div className="flex flex-wrap gap-2 mb-8">
            {Array.isArray(article.tags) ? (
              article.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-zinc-900 text-zinc-400 text-sm rounded-lg border border-white/5 hover:border-blue-500/30 transition-colors cursor-default">
                  #{tag}
                </span>
              ))
            ) : typeof article.tags === 'string' && article.tags.length > 0 ? (
              article.tags.split(',').map(tag => (
                <span key={tag.trim()} className="px-3 py-1 bg-zinc-900 text-zinc-400 text-sm rounded-lg border border-white/5 hover:border-blue-500/30 transition-colors cursor-default">
                  #{tag.trim()}
                </span>
              ))
            ) : null}
          </div>



          <div className="flex items-center justify-center space-x-4 py-12">
            <button className="px-8 py-3 bg-white text-zinc-950 font-bold rounded-xl hover:bg-zinc-200 transition-colors shadow-lg">
              Applaud
            </button>
            <button onClick={() => navigate('/articles')} className="px-8 py-3 bg-zinc-900 text-white font-bold rounded-xl border border-white/5 hover:bg-zinc-800 transition-colors">
              Read More Like This
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
