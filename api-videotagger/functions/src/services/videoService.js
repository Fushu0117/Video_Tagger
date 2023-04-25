const supabase = require('./dbService');
const colors = require('../utils/colors');

const getVideos = async () => {
  const { data, error } = await supabase
    .from('videos')
    .select()
    .order('created_at', { ascending: false });

  // change video email to user name from users table
  const { data: users, error: errorUsers } = await supabase
    .from('users')
    .select();
  if (errorUsers) {
    console.log(colors.red('Error getting users: ' + errorUsers));
    return {
      status: 500,
      error: errorUsers
    };
  }
  data.forEach((video) => {
    const user = users.find((user) => user.email === video.email);
    video.user_name = user.name;
  });

  if (error) {
    console.log(colors.red('Error getting videos: ' + error));
    return {
      status: 500,
      error: error
    };
  }
  return { status: 200, data: data };
};

const getVideosFromEmail = async (email) => {
  const { data, error } = await supabase
    .from('videos')
    .select()
    .eq('email', email)
    .order('created_at', { ascending: false });
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

const updateViewCount = async (id) => {
  const { data: video, error: errorVideo } = await supabase
    .from('videos')
    .select('views')
    .eq('url', id);
  if (errorVideo) {
    console.log(colors.red('Error getting video: ' + errorVideo));
    return {
      status: 500,
      error: errorVideo
    };
  }
  if (video.length === 0) return { status: 404, error: 'Video not found' };
  const { data, error } = await supabase
    .from('videos')
    .update({ views: video[0].views + 1 })
    .eq('url', id)
    .select();
  if (error) {
    console.log(colors.red('Error updating video: ' + error));
    return {
      status: 500,
      error: error
    };
  }
  return { status: 200, data: data };
};

module.exports = {
  getVideos,
  getVideosFromEmail,
  insertVideo,
  updateViewCount
};
