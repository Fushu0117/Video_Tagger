const {
  getTags,
  getTagsFromVideoAndEmail,
  insertTag,
  deleteTag
} = require('../services/tagService');

const getAll = async (_, res, next) => {
  try {
    const tags = await getTags();
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};

const getFromVideoAndEmail = async (req, res, next) => {
  try {
    const tags = await getTagsFromVideoAndEmail(
      req.params.video,
      req.params.user
    );
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

const del = async (req, res, next) => {
  try {
    const tag = await deleteTag(req.params.id);
    res.status(200).json(tag);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getFromVideoAndEmail,
  post,
  del
};
