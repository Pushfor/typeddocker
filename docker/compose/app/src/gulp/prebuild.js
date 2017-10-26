const gulp = require('gulp');
const eventStream = require('event-stream');
const fs = require('fs');
const path = require('path');
const sass = require('node-sass');

function run(content, next) {

    var matches = content.match(/require\(([^\)]+)\)/g);
    var dir = path.dirname(this.file.path);

    if (matches === null || matches.length === 0) {
        return next(null, content);

    }

    return Promise.all(matches.map(match => {
        var details = match.match(/require\(('|")([^\)]+)("|')\)/);
        var filePath = path.join(dir, details[2]);

        return (new Promise((resolve, reject) => fs.readFile(filePath, 'utf-8', (err, fileContent) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            if (details[2].match(/\.scss$/)) {
                sass.render({
                    file: filePath
                }, (err, result) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    resolve(result.css.toString('utf-8'));
                });
                return;
            }
            resolve(fileContent);
        })))
            .then((fileContent) => {
                content = content.replace(match, JSON.stringify(fileContent));
            });

    })).then(() => next(null, content));
}

module.exports = function gulpChange() {

    return eventStream.map(function (file, done) {
        if (file.isNull()) {
            return done(null, file);
        }
        if (file.isStream()) {
            return done(new PluginError('typedocker prebuild', 'Streaming not supported.'));
        }

        var content = file.contents.toString();
        var ctx = {
            file: file,
            fname: file.history[file.history.length - 1].substr(file.base.length),
            originalContent: content
        };

        function next(err, content) {
            if (err) {
                return done(err);
            }
            if (content) {
                file.contents = new Buffer(content);
            }
            done(null, file);
        }

        if (run.length > 1) {
            run.call(ctx, content, next);
        } else {
            next(null, content)
        }
    });
};
