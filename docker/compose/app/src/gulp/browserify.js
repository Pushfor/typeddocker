const gulp = require('gulp');
const browserify = require('browserify');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const tsify = require('tsify');
const sourcemaps = require('gulp-sourcemaps');
const typescript = require('typescript');
const _ = require('lodash');
const stringify = require('stringify');
const scssify = require('scssify');

/**
 * Setups browserify pipeline for frontend frameworks
 * @param {string} entry
 * @param {string} outname
 * @param {object} config
 * @param {object} tsConfig
 */
module.exports = (entry, outname, config, tsConfig) => {

    let bundleConfig = {
        entries: [entry],
        debug: true,
        extension: ['.ts'],
        outputName: outname
    };

    let tsifyConfig = {
        noImplicitAny: false,
        project: __dirname + '/../../tsconfig.json',
        typescript: typescript
    };

    if (config) {
        bundleConfig = _.assign({}, bundleConfig, config);
    }
    if (tsConfig) {
        tsifyConfig = _.assign({}, tsifyConfig, tsConfig);
    }

    const b = browserify(bundleConfig)        
        .transform(scssify, {
            // Disable/enable <style> injection; true by default
            autoInject: false,

            // Useful for debugging; adds data-href="src/foo.scss" to <style> tags
            // autoInject: 'verbose',

            // This can be an object too
            autoInject: {
                // verbose: false,

                // If true the <style> tag will be prepended to the <head>
                // prepend: false
            },
            raw: true,
            // require('./MyComponent.scss').css === '.MyComponent{color:red;background:blue}'
            // autoInject: false, will also enable this
            // pre 1.x.x, this is enabled by default
            export: true,

            // Pass options to the compiler, check the node-sass project for more details
            sass: {
                // See the relevant node-sass documentation
                // importer: 'custom-importers.js',

                // This will let the importer state be reset if scssify
                // is called several times within the same process, e.g. by factor-bundle
                // should export a factory function (which returns an importer function)
                // overrides opt.sass.importer
                // importerFactory: 'custom-importer-factory.js',

                // Enable both of these to get source maps working
                // "browserify --debug" will also enable css sourcemaps
                sourceMapEmbed: true,
                sourceMapContents: true,

                // This is the default only when opt.sass is undefined
                outputStyle: 'compressed'
            },

            // Configure postcss plugins too!
            // postcss is a "soft" dependency so you may need to install it yourself
            postcss: {
                autoprefixer: {
                    browsers: ['last 2 versions']
                }
            }
        })
        .transform(stringify(['.html', '.css']))
        .plugin(tsify, tsifyConfig)

    b.on('log', gutil.log);
    b.on('error', gutil.log);

    return b.bundle()
        .on('error', function (err) {
            console.log(err);
            console.log(err.stack);
            this.emit('end');
        })
        .pipe(plumber())
        .pipe(source(outname))
        .pipe(buffer())
        // .pipe(uglify())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sourcemaps.write());
};
