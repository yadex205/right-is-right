const browserSync = require('browser-sync')
const gulp = require('gulp')
const plug = require('gulp-load-plugins')()
const rimraf = require('rimraf')
const runSequence = require('run-sequence')

const HTML_SRC = 'src/html/**/*.ejs'
const CSS_SRC = 'src/css/**/*.scss'
const JS_SRC = 'src/js/**/*.js'
const IMG_SRC = 'src/img/**/*'

const EJS_ARGS = {
    css: [
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        'css/style.css'
    ],
    section: ['top', 'about', 'character', 'stage', 'distribution', 'credit']
}

gulp.task('build', (next) => {
    runSequence('clean', ['html', 'css', 'js', 'img'], next)
})

gulp.task('live', ['build'], () => {
    gulp.watch(HTML_SRC, ['html'])
    gulp.watch(CSS_SRC, ['css'])
    gulp.watch(JS_SRC, ['js'])
    gulp.watch(IMG_SRC, ['img'])
    browserSync.init({
        server: { baseDir: './htdocs' },
        port: 3005
    })
})

gulp.task('clean', (next) => {
    rimraf('htdocs/', () => { next() })
})

gulp.task('html', () => {
    return gulp.src(HTML_SRC)
        .pipe(plug.plumber())
        .pipe(plug.ignore('_*.ejs'))
        .pipe(plug.ejs(EJS_ARGS, { ext: '.html' }))
        .pipe(plug.htmlmin())
        .pipe(gulp.dest('./htdocs'))
        .pipe(browserSync.stream())
})

gulp.task('css', () => {
    return gulp.src(CSS_SRC)
        .pipe(plug.plumber())
        .pipe(plug.sass())
        .pipe(gulp.dest('./htdocs/css'))
        .pipe(browserSync.stream())
})

gulp.task('js', () => {
    return gulp.src(JS_SRC)
        .pipe(plug.plumber())
        .pipe(plug.uglify())
        .pipe(plug.concat('index.js'))
        .pipe(gulp.dest('./htdocs/js'))
        .pipe(browserSync.stream())
})

gulp.task('img', () => {
    return gulp.src(IMG_SRC)
        .pipe(gulp.dest('htdocs/img'))
        .pipe(browserSync.stream())
})
