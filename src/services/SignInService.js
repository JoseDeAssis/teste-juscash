import ApiConnector from '../api/apiConnector';
import AuthService from './AuthService';

const SignInService = {
  authenticateUser: ({ email, password }) => {
    const users = ApiConnector.getUsers();
    const user = users.find((user) => {
      if (user.email === email) {
        if (user.password === password) {
          return user;
        } else {
          throw new Error('senha');
        }
      }
      return false;
    });

    if (user) {
      AuthService.generateSessionToken(user);
      return true;
    }
    throw new Error('Credenciais inválidas');
  },
};

export default SignInService;
