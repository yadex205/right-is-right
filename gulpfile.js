const browserSync = require('browser-sync')
const gulp = require('gulp')
const plug = require('gulp-load-plugins')()

const HTML_SRC = './src/html/**/*.ejs'
const CSS_SRC = './src/css/**/*.scss'
const JS_SRC = './src/js/**/*.js'

gulp.task('live', () => {
    gulp.watch(HTML_SRC, ['html'])
    gulp.watch(CSS_SRC, ['css'])
    gulp.watch(JS_SRC, ['js'])
    browserSync.init({
        server: { baseDir: './htdocs' }
    })
})

gulp.task('html', () => {
    gulp.src(HTML_SRC)
        .pipe(plug.plumber())
        .pipe(plug.ignore('_*.ejs'))
        .pipe(plug.ejs({}, { ext: '.html' }))
        .pipe(plug.htmlmin())
        .pipe(gulp.dst('./htdocs'))
        .pipe(browserSync.stream())
})

gulp.task('css', () => {
    gulp.src(CSS_SRC)
        .pipe(plug.plumber())
        .pipe(plug.sass())
        .pipe(gulp.dest('./htdocs/css'))
        .pipe(browserSync.stream())
})

gulp.task('js', () => {
    gulp.src(JS_SRC)
        .pipe(plug.plumber())
        .pipe(plug.uglify())
        .pipe(gulp.dest('./htdocs/js'))
        .pipe(browserSync.stream())
})
