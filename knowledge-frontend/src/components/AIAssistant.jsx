import React, { useState, useRef, useEffect } from 'react';
import AIService from '../services/AIService';

const AIAssistant = ({ content, title, tags, onUpdateTitle, onUpdateContent, onUpdateTags }) => {
  const [loading, setLoading] = useState(null); // 'title', 'writing', 'summary', 'tags'
  const latestContent = useRef(content);
  const latestTitle = useRef(title);

  useEffect(() => {
    latestContent.current = content;
  }, [content]);

  useEffect(() => {
    latestTitle.current = title;
  }, [title]);

  const [showMenu, setShowMenu] = useState(false);

  const handleAction = async (action) => {
    const startingContent = content;
    const startingTitle = title;
    
    setLoading(action);
    setShowMenu(false);
    
    try {
      let result;
      switch (action) {
        case 'title':
          result = await AIService.suggestTitle(startingContent);
          onUpdateTitle(result);
          break;
        case 'clear':
          result = await AIService.rewriteClearly(startingContent);
          mergeContent(result, startingContent);
          break;
        case 'grammar':
          result = await AIService.improveGrammar(startingContent);
          mergeContent(result, startingContent);
          break;
        case 'concise':
          result = await AIService.makeConcise(startingContent);
          mergeContent(result, startingContent);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`AI Error (${action}):`, error);
    } finally {
      setLoading(null);
    }
  };

  const mergeContent = (result, startingContent) => {
    const currentContent = latestContent.current;
    if (currentContent !== startingContent) {
      const startingTrimmed = startingContent.endsWith('</p>') ? startingContent.slice(0, -4) : startingContent;
      if (currentContent.startsWith(startingTrimmed)) {
        onUpdateContent(result + currentContent.substring(startingTrimmed.length));
      } else {
        onUpdateContent(result + `<p><small style="color: #666">[Edits preserved]</small></p>` + currentContent);
      }
    } else {
      onUpdateContent(result);
    }
  };

  const actions = [
    { id: 'clear', label: 'Rewrite Clearly', icon: '✨' },
    { id: 'grammar', label: 'Improve Grammar', icon: '✍️' },
    { id: 'concise', label: 'Make Concise', icon: '📉' },
    { id: 'title', label: 'Better Title', icon: '📝' }
  ];

  return (
    <div className="relative mb-6">
      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        disabled={loading !== null}
        className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg
          ${loading 
            ? 'bg-blue-600 text-white animate-pulse' 
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 active:scale-95 shadow-blue-500/20'}
        `}
      >
        <span className="text-lg">🤖</span>
        {loading ? 'AI is working...' : 'Improve with AI'}
        <span className={`transition-transform duration-200 ${showMenu ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {showMenu && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl">
          <div className="p-2 space-y-1">
            {actions.map(action => (
              <button
                key={action.id}
                type="button"
                onClick={() => handleAction(action.id)}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-3 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{action.icon}</span>
                <div>
                  <div className="text-sm font-bold text-zinc-100">{action.label}</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-tighter">AI Powered</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
