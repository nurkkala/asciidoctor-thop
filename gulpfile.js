/**
 * Created by tom on 1/20/16.
 */

var bs = require('browser-sync').create();
var gulp = require('gulp');
var exec = require('gulp-exec');
var debug = require('gulp-debug');

gulp.task('adoc', function() {
    return gulp.src('./*.adoc')
        .pipe(debug())
        .pipe(exec('asciidoctor -r asciidoctor-diagram -D ./foo <%= file.path %>'))
        .pipe(exec.reporter());
});

gulp.task('serve', ['adoc'], function () {
    // Initialize the Browser Sync server
    bs.init({
        server: {
            baseDir: "./foo",
            directory: true
        },
        startPath: '/thop.html',
        files: './foo/*.html'
    });

    // Rerun Asciidoctor when any source file changes.
    gulp.watch('*.adoc', ['adoc']);
});
