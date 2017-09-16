const gulp = require('gulp')

module.exports = () => {
    gulp.task('release', ['clean'], () => {
        gulp.start([
            'html',
            'pug',
            'css',
            'less',
            'sass',
            'javascript',
            'babel',
            'image',
            'font',
            'media',
            'vendor'
        ])
    }).help = {
        '': '执行所有编译任务',
        '--development': '设置为开发环境',
        '--production': '设置为生产环境'
    }
}