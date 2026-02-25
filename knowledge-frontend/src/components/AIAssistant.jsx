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

  const handleAction = async (action) => {
    const startingContent = content; // Capture what we are sending to AI
    const startingTitle = title;
    
    setLoading(action);
    try {
      let result;
      switch (action) {
        case 'title':
          result = await AIService.suggestTitle(startingContent);
          onUpdateTitle(result);
          break;
        case 'writing':
          result = await AIService.improveWriting(startingContent);
          const currentContent = latestContent.current;
          
          if (currentContent !== startingContent) {
            // User typed more! Let's try to extract the new part.
            // ReactQuill often wraps in <p>...</p>. 
            // If they just typed at the end, the new content starts with the old content minus the closing </p>
            const startingTrimmed = startingContent.endsWith('</p>') ? startingContent.slice(0, -4) : startingContent;
            
            if (currentContent.startsWith(startingTrimmed)) {
              // They appended text!
              const addedText = currentContent.substring(startingTrimmed.length);
              // Result already has its own tags, so we just append the new part (which includes the closing </p> of the current)
              onUpdateContent(result + addedText);
            } else {
              // Fallback for more complex edits: just append the whole current state after the AI result
              onUpdateContent(result + `<p><small style="color: #666">[Edits during AI fix below]</small></p>` + currentContent);
            }
          } else {
            onUpdateContent(result);
          }
          break;
        case 'summary':
          result = await AIService.summarize(startingContent);
          // Prepend to the LATEST content, not the starting content
          onUpdateContent(result + "<br/>" + latestContent.current);
          break;
        case 'tags':
          result = await AIService.suggestTags(startingTitle, startingContent);
          onUpdateTags(result.join(', '));
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

  const actions = [
    { id: 'title', label: 'Magic Title', icon: '✨' },
    { id: 'writing', label: 'Fix Writing', icon: '✍️' },
    { id: 'summary', label: 'Summarize', icon: '📝' },
    { id: 'tags', label: 'Suggest Tags', icon: '🏷️' }
  ];

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl mb-6">
      <div className="w-full mb-2 flex items-center gap-2">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">AI Writing Assistant</span>
        <div className="h-[1px] flex-1 bg-blue-500/20"></div>
      </div>
      
      {actions.map(action => (
        <button
          key={action.id}
          type="button"
          onClick={() => handleAction(action.id)}
          disabled={loading !== null}
          className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all
            ${loading === action.id 
              ? 'bg-blue-600 text-white animate-pulse' 
              : 'bg-zinc-800 text-zinc-300 hover:bg-blue-600/20 hover:text-blue-400 border border-white/5'}
            ${loading !== null && loading !== action.id ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <span>{action.icon}</span>
          {loading === action.id ? 'Thinking...' : action.label}
        </button>
      ))}
    </div>
  );
};

export default AIAssistant;
