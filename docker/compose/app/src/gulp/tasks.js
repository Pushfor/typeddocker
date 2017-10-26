const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const gulpSequence = require('gulp-sequence');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefix = require('gulp-autoprefixer');
const browserify = require('./browserify');
const watch = require('gulp-watch');

/**
 * Generates build tasks
 * @param {string} name of the main task
 * @param {object} options
 * @param {string[]|string} options.watch - source on host device
 * @param {string} options.src - source root in docker container
 * @param {object} options.html
 * @param {string[]|string} options.html.src
 * @param {string} options.html.dest
 * @param {object} options.js
 * @param {string[]|string} options.js.src
 * @param {string} options.js.dest
 * @param {object} options.js.options
 * @param {string} options.js.bundle
 * @param {object} options.assets
 * @param {string[]|string} options.assets.src
 * @param {string} options.assets.dest
 * @param {object} options.scss
 * @param {string[]|string} options.scss.src
 * @param {string} options.scss.dest
 */
module.exports = (name, options) => {

    if (!name || !options) return;

    let jobs = [];

    if(options.require) {
        jobs = jobs.concat(options.require);
    }

    // HTML
    if (options.html) {
        jobs.push(name + ':html');
        gulp
            .task(name + ':html', () => gulp
                .src(options.html.src)
                .pipe(htmlmin({ collapseWhitespace: true }))
                .pipe(gulp.dest(options.html.dest)));
    }

    // JavaScript/TypeScript
    if (options.js) {
        jobs.push(name + ':js');
        gulp
            .task(name + ':js', () => {

                let bundles = options.js.bundle;

                if (!Array.isArray(options.js.bundle)) {
                    bundles = [options.js.bundle];
                }

                return Promise
                    .all(options.js.src.map((src, index) => browserify(src, bundles[index], options.js.options, options.js.options, options.typescript)
                        .pipe(gulp.dest(options.js.dest))));
            });
    }

    // Assets
    if (options.assets) {
        jobs.push(name + ':assets');
        gulp
            .task(name + ':assets', () => gulp
                .src(options.assets.src)
                .pipe(gulp.dest(options.assets.dest)));
    }

    // Scss
    if (options.scss) {
        jobs.push(name + ':scss');

        gulp.task(name + ':scss', function () {
            return gulp.src(options.scss.src)
                .pipe(sourcemaps.init())
                .pipe(sass({ errLogToConsole: true }))
                .pipe(sourcemaps.write({ includeContent: false, sourceRoot: '.' }))

                .pipe(sourcemaps.init({ loadMaps: true }))
                .pipe(autoprefix({ browsers: ['last 2 versions'], cascade: false }))
                .pipe(sourcemaps.write('.', { includeContent: false }))

                .pipe(gulp.dest(options.scss.dest));
        });
    }

    // Watch
    gulp
        .task(name + ':watch', () => watch(options.watch, { interval: 1000, mode: 'poll', usePolling: true }, () => {
            gulp.start(name + ':rebuild');
        }));

    // Copy from host
    gulp
        .task(name + ':copy', () => {
            return gulp
                .src(options.watch)
                .pipe(gulp.dest(options.src));
        });

    // Rebuild
    gulp
        .task(name + ':rebuild', done => {
            if(options.copy === false) {
                gulpSequence(name)(done);    
                return;
            }
            gulpSequence(name + ':copy', name)(done);
        });

    // Build    

    if(options.after) {
        jobs = jobs.concat(options.after);
    }


    gulp
        .task(name, done => {
            gulpSequence(...jobs)(done);
        });

};
