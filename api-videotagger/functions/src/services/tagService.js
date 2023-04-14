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

const getTagsFromVideoAndEmail = async (video, email) => {
  // get video ID from video url and email and order by timestamp
  const { data: videos, error: errorVideo } = await supabase
    .from('videos')
    .select()
    .eq('url', video)
    .eq('email', email)
    .order('id', { ascending: false });

  console.log('videos: ' + JSON.stringify(videos));

  if (errorVideo) {
    console.log(colors.red('Error getting videos: ' + errorVideo));
    return {
      status: 500,
      error: errorVideo
    };
  }

  const { data, error } = await supabase
    .from('tags')
    .select()
    .eq('video', videos[0]?.id)
    .eq('user', email);
  if (error) {
    console.log(colors.red('Error getting tags: ' + error));
    return {
      status: 500,
      error: error
    };
  }
  return { status: 200, data: data };
};

const insertTag = async (tag) => {
  let result = await validateVideo(tag);
  let videoId = result.data[0].id;
  const { data, error } = await supabase.from('tags').insert({
    video: videoId,
    user: tag.user,
    tag: tag.tag,
    note: tag.note,
    timestamp: tag.timestamp
  });
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
  // get video ID from tag id
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
  const { data, error } = await supabase
    .from('videos')
    .select()
    .eq('url', info.video)
    .eq('email', info.user);

  if (error) {
    console.log(colors.red('Error getting videos: ' + error));
    return {
      status: 500,
      error: error
    };
  }

  if (data.length === 0) {
    const { data, error } = await supabase
      .from('videos')
      .insert({ title: info.videoTitle, url: info.video, email: info.user })
      .select();
    if (error) {
      console.log(colors.red('Error inserting video: ' + error));
      return {
        status: 500,
        error: error
      };
    }
    return { status: 200, data: data };
  }
  return { status: 200, data: data };
};

module.exports = {
  getTags,
  getTagsFromVideoAndEmail,
  insertTag,
  deleteTag
};
