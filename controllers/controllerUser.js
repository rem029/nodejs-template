const login = (req = Request, res = Response) => {
  res.status(200).send('from login');
};

const logout = (req = Request, res = Response) => {
  res.status(200).send('from logout');
};

const signup = (req = Request, res = Response) => {
  res.status(200).send('from signup');
};

module.exports = { login, logout, signup };
