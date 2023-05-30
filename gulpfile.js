const { task, parallel } = require('gulp');
const styleTasks = require('./gulp/style');
const scriptTasks = require('./gulp/script');

// list task css
task('compile-sass', styleTasks.compileSass);
task('watch-sass', styleTasks.watchSass);

// task all css
task('css', parallel('compile-sass', 'watch-sass'));

// list task js
task('minify-js', scriptTasks.minifyScripts);
task('copy-js', scriptTasks.copyScripts);

// task all js
task('js', parallel('minify-js', 'copy-js'));

// task default
task('default', parallel('css', 'js'));