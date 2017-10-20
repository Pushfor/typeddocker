const gulp = require('gulp');
const ts = require('../../gulp/ts').ts;
const gulpSequence = require('gulp-sequence');
const watch = require('gulp-watch');

gulp.task('express:build', () => {
    return ts('./apps/express/*.ts')
        .js
        .pipe(gulp.dest('../build/express'));
});

const forever = require('gulp-forever-monitor');

gulp.task('express', done => {
    gulpSequence('express:build')(done);
});

gulp
    .task('express:watch', function() {
        watch([
                '/org-src/apps/express/*',
                '/org-src/apps/express/**/*',
            ], { interval: 1000, mode: 'poll', usePolling: true }, function() {
                gulp.start('express:rebuild');
            });
    });

gulp
    .task('express:copy', () => {
        return gulp
            .src([
                '/org-src/apps/express/*',
                '/org-src/apps/express/**/*'
            ])
            .pipe(gulp
                .dest('./apps/express'));
    });

gulp
    .task('express:rebuild', done => {
        gulpSequence('express:copy', 'express')(done);
    });    
