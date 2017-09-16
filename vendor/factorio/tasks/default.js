const gulp = require('gulp')

module.exports = () => {
    gulp.task('default', ['release'], () => {
        gulp.start(['watch', 'serve'])
    }).help = '开启静态服务器和文件监听'
}