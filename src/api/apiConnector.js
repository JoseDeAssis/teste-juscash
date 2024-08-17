const ApiConnector = {
  getUsers: () => {
    return JSON.parse(localStorage.getItem('users')) || [];
  },

  saveUsers: (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  },

  getLeads: () => {
    return JSON.parse(localStorage.getItem('leads')) || [];
  },

  saveLeads: (leads) => {
    localStorage.setItem('leads', JSON.stringify(leads));
  },
};

export default ApiConnector;
