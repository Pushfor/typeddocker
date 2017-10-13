const gulp = require('gulp');
const typescript = require('gulp-typescript');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');

/**
 * Transpiles TypeScript for given paths
 * @param {string} source 
 * @param {string} dest 
 */
function ts(source) {
    const project = typescript.createProject('./tsconfig.json');
    return tsResult = gulp
        .src(source)
        .pipe(project());
}

gulp.task('express', () => {
    return ts('./apps/express/index.ts').js.pipe(gulp.dest('./build/express'));
});

gulp
    .task('vanilla:html', () => gulp
        .src('./apps/vanilla/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./build/public')));

gulp
    .task('vanilla:js', () => ts('./apps/vanilla/js/*.ts').js.pipe(rename('index.min.js')).pipe(gulp.dest('./build/public/js')));

gulp
    .task('vanilla', ['vanilla:html', 'vanilla:js']);

gulp.task('default', ['express', 'vanilla']);
