const { getTags, insertTag } = require('../services/tagService');

const getAll = async (_, res, next) => {
  try {
    const tags = await getTags();
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};

const post = async (req, res, next) => {
  try {
    const tag = await insertTag(req.body);
    res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  post
};
