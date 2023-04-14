const supabase = require('./dbService');
const colors = require('../utils/colors');

const getUsers = async () => {
  const { data, error } = await supabase.from('users').select();
  if (error) {
    console.log(colors.red('Error getting users: ' + error));
    return {
      status: 500,
      error: error
    };
  }
  return { status: 200, data: data };
};

const getUser = async (id) => {
  const { data, error } = await supabase.from('users').select().eq('id', id);
  if (error) {
    console.log(colors.red('Error getting user: ' + error));
    return {
      status: 500,
      error: error
    };
  }
  return { status: 200, data: data };
};

const insertUser = async (user) => {
  const { data, error } = await supabase.from('users').insert(user);
  if (error) {
    return {
      status: 500,
      error: error
    };
  }
  return { status: 200, data: data };
};

module.exports = {
  getUsers,
  getUser,
  insertUser
};
