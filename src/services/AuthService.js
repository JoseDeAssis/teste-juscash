const AuthService = {
  generateSessionToken: (user) => {
    const token = `${user.email}-${Date.now()}`;
    localStorage.setItem('sessionToken', token);
    localStorage.setItem('tokenTimestamp', Date.now());
    return token;
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('sessionToken');
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');

    if (token && tokenTimestamp) {
      const tokenAge = Date.now() - tokenTimestamp;
      const tokenExpiry = 60 * 60 * 1000;

      if (tokenAge < tokenExpiry) {
        return true;
      } else {
        AuthService.logout();
        return false;
      }
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('tokenTimestamp');
  },
};

export default AuthService;
