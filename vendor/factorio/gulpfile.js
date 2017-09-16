module.exports = (root) => {
    // 开发目录
    const dev = `${root}/app`
    // 资源目录
    const resource = `${dev}/resource`
    // 发布目录
    const release = `${root}/release`
    // 配置
    const options = {
        dev: dev,
        root: root,
        release: release,
        html: {
            dir: `${dev}/view`,
            files: `${dev}/view/**/*.html`,
            globs: [`${dev}/view/**/*.html`, `!${dev}/view/**/_*.html`],
            release: `${release}/view`
        },
        pug: {
            dir: `${dev}/view`,
            files: `${dev}/view/**/*.pug`,
            globs: [`${dev}/view/**/*.pug`, `!${dev}/view/**/_*.pug`],
            release: `${release}/view`
        },
        css: {
            dir: `${resource}/style`,
            files: `${resource}/style/**/*.css`,
            globs: [`${resource}/style/**/*.css`, `!${resource}/style/**/_*.css`],
            release: `${release}/resource/style`
        },
        less: {
            dir: `${resource}/style`,
            files: `${resource}/style/**/*.less`,
            globs: [`${resource}/style/**/*.less`, `!${resource}/style/**/_*.less`],
            release: `${release}/resource/style`
        },
        sass: {
            dir: `${resource}/style`,
            files: `${resource}/style/**/*.{sass,scss}`,
            globs: [`${resource}/style/**/*.{sass,scss}`, `!${resource}/style/**/_*.{sass,scss}`, `!${resource}/style/bundle/**/*.{sass,scss}`],
            concats: [`${resource}/style/bundle/**/*.{sass,scss}`, `!${resource}/style/bundle/**/_*.{sass,scss}`],
            release: `${release}/resource/style`
        },
        javascript: {
            dir: `${resource}/script`,
            files: `${resource}/script/**/*.js`,
            globs: [`${resource}/script/**/*.js`, `!${resource}/script/**/_*.js`, `!${resource}/script/**/*.babel.js`],
            release: `${release}/resource/script`
        },
        babel: {
            dir: `${resource}/script`,
            files: `${resource}/script/**/*.babel.js`,
            globs: [`${resource}/script/**/*.babel.js`, `!${resource}/script/**/_*.babel.js`],
            release: `${release}/resource/script`
        },
        image: {
            dir: `${resource}/image`,
            files: `${resource}/image/**/*.{jpg,png,gif,svg,ico}`,
            globs: [`${resource}/image/**/*.{jpg,png,gif,svg,ico}`, `!${resource}/image/**/_*.{jpg,png,gif,svg,ico}`],
            release: `${release}/resource/image`
        },
        font: {
            dir: `${resource}/font`,
            files: `${resource}/font/**/*.{svg,ttf,woff,eot,otf}`,
            globs: `${resource}/font/**/*.{svg,ttf,woff,eot,otf}`,
            release: `${release}/resource/font`
        },
        media: {
            dir: `${resource}/media`,
            files: `${resource}/media/**/*.{mp3,mp4}`,
            globs: [`${resource}/media/**/*.{mp3,mp4}`, `!${resource}/media/**/_*.{mp3,mp4}`],
            release: `${release}/resource/media`
        },
        vendor: {
            dir: `${resource}/vendor`,
            files: `${resource}/vendor/**/*.*`,
            globs: `${resource}/vendor/**/*.*`,
            release: `${release}/resource/vendor`
        },
        archive: {
            globs: [`${root}/{app,vendor}/**/*`, `${root}/{.gitignore,gulpfile\.js,package\.json,README\.md}`],
            release: `${root}`
        },
        htmlBeautify: {
            // 设置缩进宽度
            indent_size: 4,
            // 设置缩进的形式 空格或 tab
            indent_char: ' ',
            // 设置 head body 标签是否缩进
            indent_inner_html: false,
            // 设置哪些标签前会增加空行
            extra_liners: [],
            // 设置是否保留换行符
            preserve_newlines: true,
            // 不应该重新格式化的标签列表（默认为内联标签）
            // 该数组为空时，所有标签都会独占一行
            unformatted: []
        },
        htmlmin: {
            // 以 html5 标准输出
            html5: true
        }
    }
    // 帮助信息
    require('./tasks/help')(options)

    // 默认任务
    require('./tasks/default')(options)
    // 监听文件变化
    require('./tasks/watch')(options)
    // 清理发布目录
    require('./tasks/clean')(options)
    // 打包文件
    require('./tasks/release')(options)
    // 归档项目
    require('./tasks/archive')(options)
    // 静态服务器
    require('./tasks/serve')(options)

    // 处理 html 文件
    require('./tasks/html')(options)
    // 处理 pug 文件
    require('./tasks/pug')(options)
    // 处理 css 文件
    require('./tasks/css')(options)
    // 处理 less 文件
    require('./tasks/less')(options)
    // 处理 sass 文件
    require('./tasks/sass')(options)
    // 处理 js
    require('./tasks/javascript')(options)
    // 处理 js (babel es6)
    require('./tasks/babel')(options)
    // 处理 jpg png svg gif ico 等图片文件
    require('./tasks/image')(options)
    // 处理 svg ttf eot woff 等字体文件
    require('./tasks/font')(options)
    // 处理 mp3 mp4 等媒体文件
    require('./tasks/media')(options)
    // 处理 vendor 目录
    require('./tasks/vendor')(options)
}