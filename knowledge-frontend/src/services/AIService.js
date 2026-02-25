/**
 * Mock AIService for demonstration purposes
 * In a real application, this would call an LLM API (like Google Gemini, OpenAI, etc.)
 */
const AIService = {
  /**
   * Summarize content
   * @param {string} content 
   * @returns {Promise<string>}
   */
  summarize: async (content) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const plainText = content.replace(/<[^>]*>/g, '').trim();
        if (!plainText) resolve("<p><strong>AI Summary:</strong> No content to summarize yet.</p>");
        
        const summary = plainText.length > 200 
          ? plainText.substring(0, 180) + "..." 
          : "This technical article explores " + (plainText.substring(0, 50) || "modern development practices") + " in depth.";
        
        resolve(`<div class="ai-summary" style="background: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: 0.75rem; border: 1px solid rgba(59, 130, 246, 0.2); margin-bottom: 1rem;">
          <strong style="color: #60a5fa;">✨ AI SUMMARY</strong><br/>
          ${summary}
        </div>`);
      }, 1500);
    });
  },

  /**
   * Improve writing style and clarity
   * @param {string} content 
   * @returns {Promise<string>}
   */
  /**
   * Rewrite content more clearly
   */
  rewriteClearly: async (content) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!content || content === '<p><br></p>') resolve(content);
        resolve(`<div class="ai-improved-clear">${content.replace(/(\. )/g, '. <br/><br/>')}</div><p><em>[Rewritten for clarity]</em></p>`);
      }, 1500);
    });
  },

  /**
   * Improve grammar
   */
  improveGrammar: async (content) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!content || content === '<p><br></p>') resolve(content);
        // Mocking grammar fix
        resolve(content.replace(/usefull/gi, 'useful').replace(/i think/gi, 'it is evident that'));
      }, 1200);
    });
  },

  /**
   * Make content more concise
   */
  makeConcise: async (content) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const plainText = content.replace(/<[^>]*>/g, '');
        if (plainText.length < 50) resolve(content);
        resolve(`<p>${plainText.substring(0, plainText.length / 2)}...</p><p><em>[Condensed for conciseness]</em></p>`);
      }, 1800);
    });
  },

  /**
   * Suggest a better title
   */
  suggestTitle: async (content) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const plainText = content.replace(/<[^>]*>/g, '').trim();
        if (!plainText) resolve("Mastering the Unknown: A Technical Guide");
        
        const topics = ["Modern Web Development", "Future of AI", "Clean Code Practices", "System Architecture"];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        resolve(`AI Suggestion: ${randomTopic}`);
      }, 1200);
    });
  }
};

export default AIService;
