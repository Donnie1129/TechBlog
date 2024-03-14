const router = require('express').Router();
const { User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const { user_id } = req.session;
    const { comment, id: post_id } = req.body;

    const userData = await User.findByPk(user_id, {
      attributes: { exclude: ['password'] }
    });

    const { username } = userData;

    const newComment = await Comment.create({
      post_id,
      comment,
      username,
      user_id
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
