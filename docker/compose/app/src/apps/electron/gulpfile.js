const gulp = require('gulp');
const ts = require('../../gulp/ts').ts;

gulp.task('electron', () => {
    return ts('./apps/electron/src/desktop.ts')
        .js
        .pipe(gulp.dest('../build/electron'));
});
