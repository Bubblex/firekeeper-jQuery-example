const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    serveIndex = require('serve-index'),
    connectLogger = require('connect-logger'),
    connectHistoryApiFallback = require('connect-history-api-fallback'),
    mockMiddleware = require('../mock/mock-middleware')

module.exports = (options) => {
    gulp.task('serve', () => {
        const files = [`${options.release}/**/*.*`]
        browserSync.init(files, {
            open: false,
            notify: false,
            logFileChanges: false,
            server: {
                baseDir: `${options.release}/view`
            },
            serveStatic: [options.release, `${options.release}/view`],
            serveStaticOptions: {
                index: false,
                extensions: ['html']
            },
            middleware: [
                mockMiddleware(),
                // 实现浏览器展示文件目录
                serveIndex(`${options.release}/view`, {
                    icons: true
                }),
                // 输出连接信息
                connectLogger(),
                connectHistoryApiFallback()
            ],
            snippetOptions: {
                rule: {
                    math: /<\/body>/i,
                    fn: function(snippet, match) {
                        return `<script>var __LOCAL__ = true</script>${snippet}${match}`
                    }
                }
            }
        })
    }).help = '开启静态服务器'
}