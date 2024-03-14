const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Homepage route
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({ raw: true });
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Dashboard route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [Post]
    });

    const posts = user.Posts.map(post => post.get({ plain: true }));
    res.render('dashboard', { posts, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// View Post route
router.get('/viewpost/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [Comment]
    });

    const comments = post.Comments.map(comment => comment.get({ plain: true }));
    const logged_in = !!req.session.user_id;

    res.render('viewpost', { post: post.get({ plain: true }), comments, logged_in, add_comment: false });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
  } else {
    res.render('login');
  }
});

// Signup route
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Create Post route
router.get('/createpost', (req, res) => {
  res.render('newpost', { logged_in: true });
});

// Update Post route
router.get('/updatepost/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, { raw: true });
    res.render('updatepost', { post, logged_in: true });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
