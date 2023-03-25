const { supabase_config } = require('../config/db');
const colors = require('../utils/colors');
// use supabase package
const { createClient } = require('@supabase/supabase-js');

module.exports = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
