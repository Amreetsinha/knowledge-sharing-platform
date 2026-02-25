import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <Link 
      to={`/article/${article.id}`}
      className="group block bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/30 hover:bg-zinc-900/60 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
          {article.category}
        </span>
        <span className="text-zinc-500 text-xs">
          {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : 'Just now'}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
        {article.title}
      </h3>
      
      <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
        {article.summary}
      </p>
      
      <div className="flex items-center justify-between border-t border-white/5 pt-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white uppercase">
            {(article.authorName || article.author || 'A')[0]}
          </div>
          <span className="text-zinc-300 text-sm font-medium">{article.authorName || article.author || 'Anonymous'}</span>
        </div>

        
        <div className="flex items-center space-x-2 text-zinc-500 text-xs">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>Read More</span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
