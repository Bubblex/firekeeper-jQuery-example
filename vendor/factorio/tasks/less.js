const gulp = require('gulp'),
    watch = require('gulp-watch'),
    changed = require('gulp-changed'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    plumber = require('gulp-plumber'),
    less = require('gulp-less'),
    mode = require('gulp-mode')()

module.exports = (options) => {
    gulp.task('less', () => {
        return gulp.src(options.less.globs)
            .pipe(changed(options.less.release, { extension: '.css' }))
            .pipe(plumber())
            .pipe(mode['development'](sourcemaps.init()))
            .pipe(less())
            .pipe(autoprefixer())
            .pipe(mode['production'](cssnano({
                zindex: false
            })))
            .pipe(mode['development'](sourcemaps.write()))
            .pipe(gulp.dest(options.less.release))
    })

    gulp.task('watch:less', () => {
        watch(options.less.files, () => {
            gulp.start('less')
        })
    })
}
