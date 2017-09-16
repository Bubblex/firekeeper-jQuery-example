const gulp = require('gulp'),
    watch = require('gulp-watch'),
    changed = require('gulp-changed'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    sass = require('gulp-sass'),
    mode = require('gulp-mode')(),
    concat = require('gulp-concat'),
    globs = require('globs'),
    merge2 = require('merge2')

module.exports = (options) => {
    gulp.task('sass', ['bundle:sass'], () => {
        return gulp.src(options.sass.globs)
            .pipe(changed(options.sass.release, { extension: '.css' }))
            .pipe(mode['development'](sourcemaps.init()))
            .pipe(sass({
                // 输出的代码格式7
                outputStyle: 'expanded',
                // 输出的代码缩进宽度
                indentWidth: 4
            }).on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(mode['production'](cssnano({
                zindex: false
            })))
            .pipe(mode['development'](sourcemaps.write()))
            .pipe(gulp.dest(options.sass.release))
    })

    gulp.task('bundle:sass', (callback) => {
        globs(options.sass.concats, function(err, files) {
            let filenames = {}
            for (let i = 0, len = files.length; i < len; i++) {
                const filepath = files[i]
                const filename = filepath.slice(filepath.indexOf('bundle/')).split('/')[1]
                if (typeof filenames[filename] === 'object') {
                    filenames[filename].push(filepath)
                }
                else {
                    filenames[filename] = [filepath]
                }
            }
            const keys = []
            for (let key in filenames) { keys.push(key) }
            if (keys.length === 0) callback()
            const streams = merge2()
            for (let i = 0, len = keys.length; i < len; i++) {
                const stream =
                    gulp.src(filenames[keys[i]])
                        .pipe(mode['development'](sourcemaps.init()))
                        .pipe(sass({
                            // 输出的代码格式
                            outputStyle: 'expanded',
                            // 输出的代码缩进宽度
                            indentWidth: 4
                        }).on('error', sass.logError))
                        .pipe(autoprefixer())
                        .pipe(mode['production'](cssnano({
                            zindex: false
                        })))
                        .pipe(concat(`${keys[i]}.css`))
                        .pipe(mode['development'](sourcemaps.write()))
                        .pipe(gulp.dest(options.sass.release))
                i === len - 1 && stream.on('end', callback)
                streams.add(stream)
            }
        })
    })

    gulp.task('watch:sass', () => {
        watch(options.sass.files, () => {
            gulp.start('sass')
        })
    })
}