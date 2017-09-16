const gulp = require('gulp'),
    help = require('gulp-showhelp')

module.exports = () => {
    gulp.task('help', () => {
        help.show()
    }).help = '展示帮助信息'
}