import ApiConnector from '../api/apiConnector';
import { v4 as uuidv4 } from 'uuid';

const SignUpService = {
  _checkUserExists: (email) => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    return existingUsers.some((user) => user.email === email);
  },

  registerUser: ({ nomeCompleto, email, password }) => {
    const newUser = {
      id: uuidv4(),
      nomeCompleto: nomeCompleto,
      email: email,
      password: password,
    };
    if (!SignUpService._checkUserExists(email)) {
      const users = ApiConnector.getUsers();
      users.push(newUser);

      ApiConnector.saveUsers(users);
    } else {
      throw new Error('Usuário já existe.');
    }
  },
};

export default SignUpService;
