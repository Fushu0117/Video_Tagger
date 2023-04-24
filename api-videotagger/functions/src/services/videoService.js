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
  console.log('insertVideo');
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
  getVideosFromEmail,
  insertVideo
};
