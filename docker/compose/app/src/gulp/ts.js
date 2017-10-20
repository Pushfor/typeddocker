const gulp = require('gulp');
const typescript = require('gulp-typescript');

/**
 * Transpiles TypeScript for given paths
 * @param {string} source 
 * @param {string} dest 
 */
module.exports.ts = (source) => {
    const project = typescript.createProject('./tsconfig.json');
    return tsResult = gulp
        .src(source)
        .pipe(project());
}
