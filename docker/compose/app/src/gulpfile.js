const gulp = require('gulp');

// Load gulp config for all apps
require('./apps/express/gulpfile');
require('./apps/vanilla/gulpfile');
require('./apps/angular/gulpfile');
require('./apps/react/gulpfile');

// Setup main tasks
// see ../override.start.sh and ../Dockerfile for details
gulp.task('default', ['express', 'vanilla', 'angular', 'react', 'angular:aot']);
gulp.task('watch', ['express:watch', 'vanilla:watch', 'angular:watch', 'react:watch']);
