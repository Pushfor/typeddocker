
const tasks = require('../../gulp/tasks');

tasks('react', {
    html: {
        src: './apps/react/index.html',
        dest: '../build/public/react'
    },
    js: {
        src: ['./apps/react/src/index.tsx'],
        bundle: 'main.bundle.min.js',
        dest: '../build/public/react/js/',
        options: {
            jsx: 'react'
        }

    },
    assets: {
        src: './apps/react/assets/*',
        dest: '../build/public/react/assets'
    },
    watch: [
        '/org-src/apps/react/*',
        '/org-src/apps/react/**/*'
    ],
    src: './apps/react'
});
