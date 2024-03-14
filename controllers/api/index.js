const router = require('express').Router();
const userRoutes = require('./usersController');
const postRoutes = require('./postController');
const commentRoutes = require('./commentsController');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;