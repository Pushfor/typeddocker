const tasks = require('../../gulp/tasks');

tasks('vanilla', {
    html: {
        src: './apps/vanilla/index.html',
        dest: '../build/public'
    },
    js: {
        src: ['./apps/vanilla/js/index.ts'],
        bundle: 'main.bundle.min.js',
        dest: '../build/public/js/'
    },
    assets: {
        src: './apps/vanilla/assets/*',
        dest: '../build/public/assets'
    },
    watch: [
        '/org-src/apps/vanilla/*',
        '/org-src/apps/vanilla/**/*'
    ],
    scss: {
        src: ['./apps/vanilla/scss/index.scss'],
        dest: '../build/public/css'
    },
    src: './apps/vanilla'
});
