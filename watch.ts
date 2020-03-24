/* eslint no-console: 0 */

import chokidar from 'chokidar';

// One-liner for current directory
chokidar.watch('.').on('change', path => {
  console.log(path);
});
