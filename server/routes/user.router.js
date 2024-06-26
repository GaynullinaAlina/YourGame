const router = require('express').Router();
const bcrypt = require('bcrypt');
const { checkUser, secureRoute } = require('../miiddleWares/common');

const { User } = require('../db/models');

router.get('/check_session', async (req, res) => {
  const { userId, username, email } = req.session;
  if (userId) res.json({ id: userId, username, email });
  else res.json({ id: 0, username: '', email: '' });
});

router.post('/register', secureRoute, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.status(401).json({ err: 'This user is already registered!' });
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, email, password: hash });
      req.session.email = newUser.email;
      req.session.username = newUser.username;
      req.session.userId = newUser.id;
      // console.log(req.session);
      req.session.save(() => {
        console.log(
          `Welcome, ${newUser.username}. Your registration completed with email ${newUser.email}`,
        );
        res.status(201).json({
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
});

router.post('/login', secureRoute, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ err: `User with email: ${email} not found!` });
    } else {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        req.session.email = user.email;
        req.session.username = user.username;
        req.session.userId = user.id;
        req.session.save(() => {
          res
            .status(200)
            .json({
              id: user.id, username: user.username, email: user.email,
            });
        });
      } else {
        res.status(401).json({
          err: `${user.username}, sorry, but your password is incorrected. Try again!`,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.get('/logout', checkUser, (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('cookiesGame');
    res.sendStatus(200);
  });
});

module.exports = router;
