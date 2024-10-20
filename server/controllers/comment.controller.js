const Comment = require('../models/comment.model');
const Post = require('../models/post.model');

module.exports.create = async (req, res) => {
  try {
    const { name, text, postId } = req.body;
    const comment = new Comment({ name, text, postId });

    await comment.save();

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    post.comments.push(comment._id);
    await post.save();

    res.status(201).json(comment);
  } catch (e) {
    console.error(e); // Логирование ошибки
    res.status(500).json({ message: 'Ошибка при создании комментария', error: e.message });
  }
};







/* const Comment = require('../models/comment.model');
const Post = require('../models/post.model');

module.exports.create = async (req, res) => {
  try {
    const { name, text, postId } = req.body;
    const comment = new Comment({ name, text, postId });

    await comment.save();

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    post.comments.push(comment._id);
    await post.save();

    res.status(201).json(comment);
  } catch (e) {
    console.error(e); // Логируем ошибку для отладки
    res.status(500).json({ message: 'Ошибка при создании комментария', error: e.message });
  }
}; */








/* const Comment = require('../models/comment.model')
const Post = require('../models/post.model')

module.exports.create = async (req, res) => {
  try {
    const {name, text, postId} = req.body
    const comment = new Comment({name, text, postId})

    await comment.save()

    const post = await Post.findById(postId)
    post.comments.push(comment._id)
    await post.save()

    res.status(201).json(comment)

  } catch (e) {
    res.status(500).json(e)
  }
}
 */
