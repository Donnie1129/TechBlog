const router = require('express').Router();
const { User } = require('../../models');

// Register a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.save();

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userData = await User.findOne({ where: { username } });

    if (!userData || !await userData.checkPassword(password)) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.save();

    res.json({ user: userData, message: 'You are now logged in!' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
