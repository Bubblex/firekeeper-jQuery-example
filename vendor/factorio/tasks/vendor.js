const gulp = require('gulp'),
    watch = require('gulp-watch'),
    changed = require('gulp-changed')

module.exports = (options) => {
    gulp.task('vendor', () => {
        return gulp.src(options.vendor.globs)
            .pipe(changed(options.vendor.release))
            .pipe(gulp.dest(options.vendor.release))
    })

    gulp.task('watch:vendor', () => {
        watch(options.vendor.files, () => {
            gulp.start('vendor')
        })
    })
}