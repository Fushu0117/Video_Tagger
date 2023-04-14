const colors = require('./src/utils/colors');
const { port } = require('./src/config/config');
const supabase = require('./src/services/dbService');
const app = require('./src/server');
const serverless = require('serverless-http');

if (!supabase) console.log(colors.red('Failed to connect to database'));
else console.log(colors.verbose('Connected to database'));

app.listen(port, () => {
  console.log(colors.silly(`Server running on port ${port}`));
});

module.exports.handler = serverless(app);
