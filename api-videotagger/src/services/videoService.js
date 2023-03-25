const supabase = require('./dbService');
const colors = require('../utils/colors');

const getVideos = async () => {
  const { data, error } = await supabase.from('videos').select();
  if (error) {
    console.log(colors.red('Error getting videos: ' + error));
    return {
      status: 500,
      error: error
    };
  }
  return { status: 200, data: data };
};

const insertVideo = async (video) => {
  const { data, error } = await supabase.from('videos').insert(video);
  if (error) {
    console.log(colors.red('Error inserting video: ' + error));
    return {
      status: 500,
      error: error
    };
  }
  return { status: 200, data: data };
};

module.exports = {
  getVideos,
  insertVideo
};
