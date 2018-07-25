const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;


const src = {
    sass: 'sass/**/*.scss',
    css: 'public/css',
    html: 'public/*.html',
    js: 'public/js/**/*.js'
};

gulp.task('clean', () => {
    return del('root');
});

gulp.task('sass', () => {

    return gulp.src('sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src.css));
});

gulp.task('watch',  () => {

    browserSync.init(null, {
        server: {
            baseDir: "./public",
        }
    });

    gulp.watch(src.sass, gulp.series('clean', 'sass'));
});

gulp.task('default', gulp.series('clean', 'sass', 'watch'));