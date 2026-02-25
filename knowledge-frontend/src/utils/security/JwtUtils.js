import Cookies from 'js-cookie';

/**
 * Utility for handling JWT tokens and authentication state.
 * Updated to use js-cookie for consistency with ApiInterceptor.
 */
const JwtUtils = {
  getToken: () => Cookies.get('jwtToken'),
  
  saveToken: (token) => Cookies.set('jwtToken', token, { expires: 1 }),
  
  removeToken: () => {
    Cookies.remove('jwtToken');
    Cookies.remove('refreshJwtToken');
  },
  
  isAuthenticated: () => {
    const token = JwtUtils.getToken();
    return !!token;
  },
  
  isTokenExpired: () => {
    const token = JwtUtils.getToken();
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (e) {
      return true;
    }
  },
  
  getUserRoles: () => {
    const token = JwtUtils.getToken();
    if (!token) return [];
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roles || [];
    } catch (e) {
      return [];
    }
  }
};

export default JwtUtils;

