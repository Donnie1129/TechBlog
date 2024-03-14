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

    const { username, id: userId } = userData.get({ plain: true });
    const postData = { ...req.body, username, userId };
    
    const newPost = await Post.create(postData);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a post by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const { user_id } = req.session;
    const { id } = req.params;

    const deletedCount = await Post.destroy({
      where: { id, userId: user_id }
    });

    if (!deletedCount) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, ...postData } = req.body;

    await Post.update(postData, {
      where: { id, userId }
    });

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
