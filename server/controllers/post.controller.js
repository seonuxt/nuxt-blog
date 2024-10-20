const Post = require('../models/post.model');

// Создание поста
module.exports.create = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    imageUrl: req.file ? `/${req.file.filename}` : null // Проверка на наличие файла
  });

  try {
    await post.save();
    res.status(201).json(post);
  } catch (e) {
    console.error(e); // Логирование ошибки
    res.status(500).json({ message: 'Ошибка при создании поста', error: e.message });
  }
};

// Получение всех постов
module.exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    console.error(e); // Логирование ошибки
    res.status(500).json({ message: 'Ошибка при получении постов', error: e.message });
  }
};

// Получение поста по ID
module.exports.getById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('comments');
    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' }); // Обработка случая, когда пост не найден
    }
    res.json(post);
  } catch (e) {
    console.error(e); // Логирование ошибки
    res.status(500).json({ message: 'Ошибка при получении поста', error: e.message });
  }
};

// Обновление поста
module.exports.update = async (req, res) => {
  const $set = {
    text: req.body.text
  };
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $set },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' }); // Обработка случая, когда пост не найден
    }
    res.json(post);
  } catch (e) {
    console.error(e); // Логирование ошибки
    res.status(500).json({ message: 'Ошибка при обновлении поста', error: e.message });
  }
};

// Удаление поста
module.exports.remove = async (req, res) => {
  try {
    const result = await Post.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Пост не найден' }); // Обработка случая, когда пост не найден
    }
    res.json({ message: 'Пост удален' });
  } catch (e) {
    console.error(e); // Логирование ошибки
    res.status(500).json({ message: 'Ошибка при удалении поста', error: e.message });
  }
};

// Добавление просмотра
module.exports.addView = async (req, res) => {
  const $set = {
    views: req.body.views + 1 // Увеличение количества просмотров
  };
  try {
    const post = await Post.findOneAndUpdate({ _id: req.params.id }, { $set });
    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' }); // Обработка случая, когда пост не найден
    }
    res.status(204).json(); // Успешный запрос без контента
  } catch (e) {
    console.error(e); // Логирование ошибки
    res.status(500).json({ message: 'Ошибка при добавлении просмотра', error: e.message });
  }
};








/* const Post = require('../models/post.model')

module.exports.create = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    imageUrl: `/${req.file.filename}`
  })

  try {
    await post.save()
    res.status(201).json(post)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort({date: -1})
    res.json(posts)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getById = async (req, res) => {
  try {
    await Post.findById(req.params.id).populate('comments').exec((error, post) => {
      res.json(post)
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.update = async (req, res) => {
  const $set = {
    text: req.body.text
  }
  try {
    const post = await Post.findOneAndUpdate({
      _id: req.params.id
    }, {$set}, {new: true})
    res.json(post)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Post.deleteOne({_id: req.params.id})
    res.json({message: 'Пост удален'})
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.addView = async (req, res) => {
  const $set = {
    views: ++req.body.views
  }
  try {
    await Post.findOneAndUpdate({_id: req.params.id}, {$set})
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
} */
