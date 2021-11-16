const { generateToken } = require('../middlewares/authToken');

const login = (req = new Request(), res = Response) => {
  const { email } = req.body;
  const user = { email: email };

  const accessToken = generateToken(user);
  res.status(200).json({ accessToken: accessToken });
};

const logout = (req = new Request(), res = Response) => {
  res.status(200).send('from logout');
};

const signup = (req = new Request(), res = Response) => {
  res.status(200).send('from signup');
};

module.exports = { login, logout, signup };
