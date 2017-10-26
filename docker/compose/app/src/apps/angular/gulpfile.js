const tasks = require('../../gulp/tasks');
const gulp = require('gulp');
const rimraf = require('rimraf');
const gulpSequence = require('gulp-sequence');
const prebuild = require('../../gulp/prebuild');
const ngc = require('../../gulp/ngc');

tasks('angular', {
    html: {
        src: './apps/angular/index.html',
        dest: '../build/public/angular'
    },
    js: {
        src: [
            './apps/angular/src/polyfills.ts',
            './apps/angular/src/main.ts'
        ],
        bundle: [
            'polyfills.bundle.min.js',
            'main.bundle.min.js'
        ],
        dest: '../build/public/angular/js/'

    },
    assets: {
        src: './apps/angular/assets/*',
        dest: '../build/public/angular/assets'
    },
    watch: [
        '/org-src/apps/angular/*',
        '/org-src/apps/angular/**/*'
    ],
    src: './apps/angular'
});

tasks('angular:aot', {
    require: ['ngc'],
    html: {
        src: './apps/angular/index.html',
        dest: '../build/public/angular-aot'
    },
    typescript: false,
    copy: false,
    js: {
        src: [
            './.tmp/src/polyfills.js',
            './.tmp/src/main.aot.js'
        ],
        bundle: [
            'polyfills.bundle.min.js',
            'main.bundle.min.js'
        ],
        dest: '../build/public/angular-aot/js/'

    },
    assets: {
        src: './apps/angular/assets/*',
        dest: '../build/public/angular-aot/assets'
    },
    watch: [
        './apps/angular/*',
        './apps/angular/**/*'
    ],
    src: './apps/angular'
});

gulp.task('ngc:rimraf', cb => {
    rimraf('./.tmp', cb);
})
gulp.task('ngc:config', ['ngc:prebuild'], () => {
    return gulp.src('./tsconfig.json')
        .pipe(gulp
            .dest('./.tmp'));
});
gulp.task('ngc:prebuild', ['ngc:rimraf'], () => {
    return gulp
        .src(['./apps/angular/**/*.ts'])
        .pipe(prebuild())
        .pipe(gulp
            .dest('./.tmp'));
});
gulp.task('ngc', ['ngc:config'], () => {
    return ngc('./.tmp/tsconfig.json', {
        compilerOptions: {
            outDir: "./"
        },
        angularCompilerOptions: {
            genDir: "./",
            skipMetadataEmit: true
        }
    });
});
