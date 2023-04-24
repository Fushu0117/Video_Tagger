const supabase = require('./dbService');
const colors = require('../utils/colors');

const getTags = async () => {
  console.log('getTags');
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

const getTagsFromVideoAndEmail = async (video, email) => {
  // get video id
  const { data: videos, error: errorVideo } = await supabase
    .from('videos')
    .select()
    .eq('url', video)
    // .eq('email', email)
    .order('id', { ascending: false });

  if (errorVideo) {
    console.log(colors.red('Error getting videos: ' + errorVideo));
    return {
      status: 500,
      error: errorVideo
    };
  }

  // insert name according to email
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

  // get tags
  const { data, error } = await supabase
    .from('tags')
    .select()
    .eq('video', videos[0]?.id)
    .order('timestamp', { ascending: true });

  if (error) {
    console.log(colors.red('Error getting tags: ' + error));
    return {
      status: 500,
      error: error
    };
  }

  data.forEach((tag) => {
    const user = users.find((user) => user.email === tag.user);
    tag.user_name = user.name;
  });

  // // add user data to tags
  // const { data, error } = await supabase
  //   .from('tags')
  //   // .join('users', 'users.email', 'tags.user')
  //   .select()
  //   .eq('video', videos[0]?.id);
  // // .eq('user', email);

  if (error) {
    console.log(colors.red('Error getting tags: ' + JSON.stringify(error)));
    return {
      status: 500,
      error: error
    };
  }

  const orderedData = data.sort((a, b) => {
    const aTime = a.timestamp.split(':');
    const bTime = b.timestamp.split(':');

    const secondsInHour = 3600;
    const secondsInMinute = 60;

    if (aTime.length === 3 && bTime.length === 3) {
      return (
        parseInt(aTime[0]) * secondsInHour +
        parseInt(aTime[1]) * secondsInMinute +
        parseInt(aTime[2]) -
        (parseInt(bTime[0]) * secondsInHour +
          parseInt(bTime[1]) * secondsInMinute +
          parseInt(bTime[2]))
      );
    } else if (aTime.length === 2 && bTime.length === 2) {
      return (
        parseInt(aTime[0]) * secondsInMinute +
        parseInt(aTime[1]) -
        (parseInt(bTime[0]) * secondsInMinute + parseInt(bTime[1]))
      );
    } else {
      return 0;
    }
  });

  return { status: 200, data: orderedData };
};

const insertTag = async (tag) => {
  let result = await validateVideo(tag);
  console.log('result', result);
  let videoId = result.data[0].id;

  const { data, error } = await supabase
    .from('tags')
    .insert({
      video: videoId,
      user: tag.user,
      tag: tag.tag,
      note: tag.note,
      timestamp: tag.timestamp
    })
    .select();

  // insert user name to tag
  const { data: user, error: errorUser } = await supabase
    .from('users')
    .select()
    .eq('email', tag.user);
  data[0].user_name = user[0].name;

  if (error) {
    console.log(colors.red('Error inserting tags: ' + error));
    return {
      status: 500,
      error: error
    };
  }
  return { status: 200, data: data };
};

const deleteTag = async (tag) => {
  const { data: videoId, error: errorTag } = await supabase
    .from('tags')
    .select()
    .eq('id', tag);
  if (errorTag) {
    console.log(colors.red('Error getting tags: ' + errorTag));
    return {
      status: 500,
      error: errorTag
    };
  }

  const { data, error } = await supabase.from('tags').delete().eq('id', tag);
  if (error) {
    console.log(colors.red('Error deleting tags: ' + error));
    return {
      status: 500,
      error: error
    };
  }

  const { data: tags, error: errorTags } = await supabase
    .from('tags')
    .select()
    .eq('video', videoId[0].video);
  if (errorTags) {
    console.log(colors.red('Error getting tags: ' + errorTags));
    return {
      status: 500,
      error: errorTags
    };
  }

  if (tags.length === 0) {
    const { data, error } = await supabase
      .from('videos')
      .delete()
      .eq('id', videoId[0].video);
    if (error) {
      console.log(colors.red('Error deleting video: ' + error));
      return {
        status: 500,
        error: error
      };
    }
  }
  return { status: 200, data: data };
};

const validateVideo = async (info) => {
  console.log(colors.blue('Validating video...'));
  console.log(colors.blue('Video info: ' + JSON.stringify(info)));
  const { data: existingVideos, error: errorExistingVideos } = await supabase
    .from('videos')
    .select()
    .eq('url', info.video);
  if (errorExistingVideos) {
    console.log(
      colors.red('Error getting existing videos: ' + errorExistingVideos)
    );
    return {
      status: 500,
      error: errorExistingVideos
    };
  }
  if (existingVideos.length > 0) {
    console.log(colors.yellow('Video already exists'));
    console.log(colors.yellow('Existing videos: ' + existingVideos));
    return { status: 200, data: existingVideos };
  } else {
    console.log(colors.blue('Video does not exist'));
    const { data: newVideos, error: errorNewVideos } = await supabase
      .from('videos')
      .insert({
        title: info.videoTitle,
        url: info.video,
        email: info.user
      })
      .select();
    if (errorNewVideos) {
      console.log(colors.red('Error inserting new video: ' + errorNewVideos));
      return {
        status: 500,
        error: errorNewVideos
      };
    }
    return { status: 200, data: newVideos };
  }
};

module.exports = {
  getTags,
  getTagsFromVideoAndEmail,
  insertTag,
  deleteTag
};
