const gulp = require('gulp'),
    watch = require('gulp-watch'),
    changed = require('gulp-changed'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    mode = require('gulp-mode')()

module.exports = (options) => {
    gulp.task('javascript', () => {
        return gulp.src(options.javascript.globs)
            .pipe(changed(options.javascript.release))
            .pipe(plumber())
            .pipe(mode['development'](sourcemaps.init()))
            .pipe(mode['production'](uglify()))
            .pipe(mode['development'](sourcemaps.write()))
            .pipe(gulp.dest(options.javascript.release))
    })

    gulp.task('watch:javascript', () => {
        watch(options.javascript.files, () => {
            gulp.start('javascript')
        })
    })
}
