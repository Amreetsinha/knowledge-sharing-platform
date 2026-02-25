import apiInterceptor from "../config/ApiInterceptor";
import Cookies from 'js-cookie';

/**
 * Handle API Errors centrally
 */
const handleApiError = (error, source) => {
  const message = error.response?.data?.message || error.message || `Error in ${source}`;
  console.error(`❌ ${source} error:`, message);
  throw new Error(message);
};

const AuthService = {
  /**
   * 🔐 Login API
   * @param {Object} loginDTO - { username: string, password: string }
   * @returns {Promise<Object>} response.data
   */
  login: async (loginDTO) => {
    try {
      const response = await apiInterceptor.post("/auth/login", loginDTO);
      console.info("✅ Login successful:", response.data);
      console.info("✅ Login successful:", response.data.data.jwtToken);
      
      // Store token if it's in the response data
      if (response.data.success && response.data.data?.token) {
        Cookies.set('jwtToken', response.data.data.token, { expires: 1 }); // Expires in 1 day
      }
      
      return response.data;
    } catch (error) {
      handleApiError(error, "login");
    }
  },

  /**
   * 📝 Signup API
   * @param {Object} signupDTO - { name, email, password, etc. }
   * @returns {Promise<Object>} response.data
   */
  signup: async (signupDTO) => {
    try {
      const response = await apiInterceptor.post("/auth/signup", signupDTO);
      console.info("✅ Signup successful:", response.data);
      return response.data;
    } catch (error) {
      handleApiError(error, "signup");
    }
  }
};

export default AuthService;
