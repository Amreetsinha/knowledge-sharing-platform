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
  improveWriting: async (content) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!content || content === '<p><br></p>') resolve(content);
        
        // Simulate professional rewriting
        let improved = content
          .replace(/good/gi, '<strong>exceptional</strong>')
          .replace(/bad/gi, '<strong>suboptimal</strong>')
          .replace(/very/gi, '<strong>significantly</strong>')
          .replace(/usefull/gi, '<strong>useful</strong>')
          .replace(/i think/gi, '<strong>it is evident that</strong>')
          .replace(/a lot of/gi, '<strong>numerous</strong>');
        
        resolve(improved);
      }, 2000);
    });
  },

  /**
   * Suggest relevant tags based on content
   * @param {string} title
   * @param {string} content 
   * @returns {Promise<string[]>}
   */
  suggestTags: async (title, content) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const keywords = ['react', 'javascript', 'web-dev', 'tech', 'programming', 'ai', 'frontend', 'backend'];
        const fullText = (title + ' ' + content).toLowerCase();
        const suggested = keywords.filter(word => fullText.includes(word));
        
        // Return at least some default tags if no match
        resolve(suggested.length > 0 ? suggested : ['technology', 'article']);
      }, 1000);
    });
  },

  /**
   * Suggest a catchy title
   * @param {string} content 
   * @returns {Promise<string>}
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
