import apiInterceptor from "../config/ApiInterceptor";

/**
 * Handle API Errors centrally
 */
const handleApiError = (error, source) => {
  const message = error.response?.data?.message || error.message || `Error in ${source}`;
  console.error(`❌ ${source} error:`, message);
  throw new Error(message);
};

const ArticleService = {
  /**
   * 📰 Get All Articles (Publicly available, Paginated)
   * @param {Object} params - { page, size, sortBy, direction, search, category }
   * @returns {Promise<Object>} response.data
   */
  getAllArticles: async (params = {}) => {
    try {
      const response = await apiInterceptor.get("/articles", { params });
      return response.data;
    } catch (error) {
      handleApiError(error, "getAllArticles");
    }
  },

  /**
   * 📖 Get Single Article by ID
   * @param {string|number} id 
   * @returns {Promise<Object>} response.data
   */
  getArticleById: async (id) => {
    try {
      console.log(id);
      
      const response = await apiInterceptor.get(`/articles/${id}`);
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      handleApiError(error, "getArticleById");
    }
  },

  /**
   * 🏠 Get Authenticated User's Articles (Paginated)
   * @param {Object} params - { page, size, sortBy, direction }
   * @returns {Promise<Object>} response.data
   */
  getMyArticles: async (params = {}) => {
    try {
      const response = await apiInterceptor.get("/articles/my", { params });
      return response.data;
    } catch (error) {
      handleApiError(error, "getMyArticles");
    }
  },

  /**
   * 🖋️ Create New Article
   * @param {Object} articleDTO 
   * @returns {Promise<Object>} response.data
   */
  createArticle: async (articleDTO) => {
  try {
    const payload = {
      ...articleDTO,
      tags: Array.isArray(articleDTO.tags)
        ? articleDTO.tags.join(",")
        : articleDTO.tags
    };

    console.log(payload);
    
    const response = await apiInterceptor.post("/articles", payload);
    return response.data;
  } catch (error) {
    handleApiError(error, "createArticle");
  }
},

  /**
   * 🛠️ Update Existing Article
   * @param {string|number} id 
   * @param {Object} articleDTO 
   * @returns {Promise<Object>} response.data
   */
  updateArticle: async (id, articleDTO) => {
    try {
      const payload = {
        ...articleDTO,
        tags: Array.isArray(articleDTO.tags)
          ? articleDTO.tags.join(",")
          : articleDTO.tags
      };
      const response = await apiInterceptor.put(`/articles/${id}`, payload);
      return response.data;
    } catch (error) {
      handleApiError(error, "updateArticle");
    }
  },


  /**
   * 🗑️ Delete Article
   * @param {string|number} id 
   * @returns {Promise<Object>} response.data
   */
  deleteArticle: async (id) => {
    try {
      const response = await apiInterceptor.delete(`/articles/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error, "deleteArticle");
    }
  }
};


export default ArticleService;
