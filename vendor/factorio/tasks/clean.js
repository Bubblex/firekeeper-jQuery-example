const gulp = require('gulp'),
    clean = require('gulp-clean')

module.exports = (options) => {
    gulp.task('clean', () => {
        return gulp.src(options.release)
            .pipe(clean())
    })
}