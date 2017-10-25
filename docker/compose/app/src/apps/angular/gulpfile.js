
const tasks = require('../../gulp/tasks');

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
