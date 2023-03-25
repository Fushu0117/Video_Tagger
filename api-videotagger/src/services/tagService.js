const supabase = require('./dbService');
const colors = require('../utils/colors');

const getTags = async () => {
  const { data, error } = await supabase.from('tags').select('*, videos(*)');
  if (error) {
    console.log(colors.red('Error getting tags: ' + error));
    return {
      status: 500,
      error: error
    };
  }
  return { status: 200, data: data };
};

const insertTag = async (video) => {
  const { data, error } = await supabase.from('tags').insert(video);
  if (error) {
    console.log(colors.red('Error inserting tags: ' + error));
    return {
      status: 500,
      error: error
    };
  }
  return { status: 200, data: data };
};

module.exports = {
  getTags,
  insertTag
};
