const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const { user_id } = req.session;
    const userData = await User.findByPk(user_id, {
      attributes: { exclude: ['password'] }
    });
    const { username, id: user_id } = userData.get({ plain: true });

    const postData = {
      ...req.body,
      username,
      user_id
    };
    
    const newPost = await Post.create(postData);

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a post by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const { user_id } = req.session;
    const { id } = req.params;

    const deletedCount = await Post.destroy({
      where: {
        id,
        user_id
      }
    });

    if (!deletedCount) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post
router.put('/', withAuth, async (req, res) => {
  try {
    const { id, ...postData } = req.body;

    await Post.update(postData, {
      where: { id }
    });

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
