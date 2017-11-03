const webpack = require('webpack');
const config = require('../webpack.config.prod');

process.env.NODE_ENV = 'production';

webpack(config).run((err, stats) => {
  if (err) {
    return 1;
  }
  const jsonStats = stats.toJson();
  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }
  if (jsonStats.hasWarnings) {
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }
  console.log(`Webpack stats: ${stats}`);
  console.log('Your app has been compiled to production mode and written to /dist. Its ready now'.green);
  return 0;
});
