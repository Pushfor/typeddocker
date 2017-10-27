const tasks = require('../../gulp/tasks');

tasks('golden-layout', {
    html: {
        src: './apps/golden-layout/index.html',
        dest: '../build/public/golden-layout'
    },
    js: {
        src: ['./apps/golden-layout/js/index.ts'],
        bundle: 'main.bundle.min.js',
        dest: '../build/public/golden-layout/js/'
    },
    watch: [
        '/org-src/apps/golden-layout/*',
        '/org-src/apps/golden-layout/**/*'
    ],
    scss: {
        src: ['./apps/golden-layout/scss/index.scss'],
        dest: '../build/public/golden-layout/css'
    },
    src: './apps/golden-layout'
});
