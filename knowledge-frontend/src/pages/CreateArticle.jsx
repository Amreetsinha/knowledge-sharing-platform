import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleService from '../services/ArticleService';
import Navbar from '../components/Navbar';
import AIAssistant from '../components/AIAssistant';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const CreateArticle = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Tech',
    content: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categories = ['Tech', 'AI', 'Backend', 'Frontend', 'DevOps', 'Cloud', 'Mobile'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const updateTitle = (title) => setFormData(prev => ({ ...prev, title }));
  const updateContent = (content) => setFormData(prev => ({ ...prev, content }));
  const updateTags = (tags) => setFormData(prev => ({ ...prev, tags }));

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'code-block'],
      ['clean']
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content || formData.content === '<p><br></p>') {
      setError('Article content cannot be empty');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const articleData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      };
      
      const response = await ArticleService.createArticle(articleData);
      if (response && response.success) {
        navigate('/articles');
      } else {
        // Fallback for demo if API isn't fully ready
        console.log('Publishing Article:', articleData);
        setTimeout(() => navigate('/articles'), 1000);
      }
    } catch (err) {
      setError(err.message || 'Failed to create article');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 pt-24 md:pt-32">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
            Create New <span className="text-blue-500">Article.</span>
          </h1>
          <p className="text-zinc-500">Share your technical expertise with the world.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <AIAssistant 
            content={formData.content}
            title={formData.title}
            tags={formData.tags}
            onUpdateTitle={updateTitle}
            onUpdateContent={updateContent}
            onUpdateTags={updateTags}
          />

          {/* Main Info Card */}
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Article Title</label>
              <input 
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a compelling title..."
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
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Tags (Comma separated)</label>
                <input 
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="e.g. react, tailwind, frontend"
                  className="w-full bg-zinc-800/30 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all text-white"
                />
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4">
            <label className="block text-sm font-bold text-zinc-400 mb-4 px-4 pt-4 uppercase tracking-wider">Content</label>
            <ReactQuill 
              theme="snow"
              value={formData.content}
              onChange={handleContentChange}
              modules={modules}
              placeholder="Tell your story..."
              className="text-white"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="text-zinc-500 hover:text-white transition-colors font-medium"
            >
              Discard Draft
            </button>
            <button 
              type="submit"
              disabled={loading}
              className={`px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold shadow-xl shadow-blue-500/20 hover:scale-105 transition-all transform active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Publishing...' : 'Publish Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
