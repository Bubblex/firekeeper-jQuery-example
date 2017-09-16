const gulp = require('gulp'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    htmlBeautify = require('gulp-html-beautify'),
    htmlmin = require('gulp-htmlmin')

module.exports = (options) => {
    gulp.task('html', () => {
        return gulp.src(options.html.globs)
            .pipe(changed(options.html.release))
            .pipe(plumber())
            .pipe(htmlBeautify(options.htmlBeautify))
            .pipe(htmlmin(options.htmlmin))
            .pipe(gulp.dest(options.html.release))
    })

    gulp.task('watch:html', () => {
        watch(options.html.files, () => {
            gulp.start('html')
        })
    })
}