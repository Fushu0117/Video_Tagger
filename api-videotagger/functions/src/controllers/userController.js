const { getUsers, getUser, insertUser } = require('../services/userService');

const getAll = async (_, res, next) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const user = await getUser(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const post = async (req, res, next) => {
  try {
    const user = await insertUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  get,
  post
};
