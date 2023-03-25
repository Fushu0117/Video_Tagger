require('dotenv').config();
module.exports = {
  supabase_config: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
  }
};
