/// <binding BeforeBuild='jsx' />
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var wwwroot = "wwwroot";
var appDir = wwwroot + "/app";

function jsx(cb)
{
    var fn = 'app';
    var file = './client/' + fn + '.jsx';
    var bundle = fn + '.bundle.js';
    browserify({
        entries: file,
        extensions: ['.jsx', 'js'],
        debug: true
    })
    .transform(babelify.configure({ presets: ['env', 'react'] }))
    .bundle()
    .on('error', err => {
        console.log('Error', err.message);
        console.log(err.codeFrame);
    })
    .pipe(source(bundle))
    .pipe(gulp.dest(appDir));
    cb();
}

exports.jsx = jsx;