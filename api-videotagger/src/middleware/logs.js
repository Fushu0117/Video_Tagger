const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const logger = () => {
  if (!fs.existsSync(path.join(__dirname, '../../logs')))
    fs.mkdirSync(path.join(__dirname, '../../logs'));
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '../../logs/access.log'),
    { flags: 'a' }
  );
  return morgan('common', { stream: accessLogStream });
};

module.exports = logger;
