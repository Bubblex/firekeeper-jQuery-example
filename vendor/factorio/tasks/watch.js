const gulp = require('gulp')

module.exports = () => {
    gulp.task('watch', [
        'watch:html',
        'watch:pug',
        'watch:css',
        'watch:less',
        'watch:sass',
        'watch:javascript',
        'watch:babel',
        'watch:image',
        'watch:font',
        'watch:media',
        'watch:vendor'
    ]).help = '监听文件变化自动执行任务'
}