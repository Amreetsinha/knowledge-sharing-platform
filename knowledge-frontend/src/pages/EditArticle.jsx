import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArticleService from '../services/ArticleService';
import Navbar from '../components/Navbar';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const EditArticle = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Tech',
    content: '',
    tags: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categories = ['Tech', 'AI', 'Backend', 'Frontend', 'DevOps', 'Cloud', 'Mobile'];

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'code-block'],
      ['clean']
    ],
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await ArticleService.getArticleById(id);
        
        if (response && response.success) {
          const article = response.data;
          console.log(response.data);
          setFormData({
            title: article.title,
            category: article.category,
            content: article.content,
            tags: Array.isArray(article.tags) ? article.tags.join(', ') : (article.tags || '')
          });

        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load article');
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content || formData.content === '<p><br></p>') {
      setError('Article content cannot be empty');
      return;
    }
    setSaving(true);
    setError('');

    try {
      const articleData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      };
      
      const response = await ArticleService.updateArticle(id, articleData);
      if (response && response.success) {
        navigate('/manage-articles');
      }
    } catch (err) {
      setError(err.message || 'Failed to update article');
      setSaving(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 pt-24 md:pt-32">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
            Edit <span className="text-blue-500">Article.</span>
          </h1>
          <p className="text-zinc-500">Make adjustments to your technical insights.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Article Title</label>
              <input 
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full bg-zinc-800/30 border border-white/5 rounded-xl px-4 py-4 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-800/30 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all appearance-none cursor-pointer text-white"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Tags</label>
                <input 
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-800/30 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all text-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4">
            <label className="block text-sm font-bold text-zinc-400 mb-4 px-4 pt-4 uppercase tracking-wider">Content</label>
            <ReactQuill 
              theme="snow"
              value={formData.content}
              onChange={handleContentChange}
              modules={modules}
              className="text-white"
            />
          </div>


          <div className="flex items-center justify-between pt-4">
            <button 
              type="button" 
              onClick={() => navigate('/manage-articles')}
              className="text-zinc-500 hover:text-white transition-colors font-medium"
            >
              Cancel Changes
            </button>
            <button 
              type="submit"
              disabled={saving}
              className={`px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold shadow-xl shadow-blue-500/20 hover:scale-105 transition-all transform active:scale-95 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {saving ? 'Saving...' : 'Update Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;
