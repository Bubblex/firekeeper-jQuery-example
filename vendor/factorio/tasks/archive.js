const gulp = require('gulp'),
    zip = require('gulp-vinyl-zip').zip

module.exports = (options) => {
    gulp.task('archive', () => {
        return gulp.src(options.archive.globs)
            .pipe(zip('release.zip'))
            .pipe(gulp.dest(options.archive.release))
    }).help = '归档项目'
}