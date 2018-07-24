const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const nodemon = require('gulp-nodemon');


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
        .pipe(gulp.dest(src.css))
        // .pipe(reload({ stream: true }));
});

gulp.task('nodemon', cb => {
    let callbackCalled = false;
    return nodemon({ script: './server.js' })
        .on('start', () => {
            if (!callbackCalled) {
                callbackCalled = true;
                cb();
            }
        });
});

gulp.task('watch', gulp.series('nodemon', () => {

    browserSync.init(null, {
        proxy: "http://localhost:5000", // port of node server
        files: ["public/**/*.*"],
    });

    gulp.watch(src.sass, gulp.series('clean', 'sass')).on('change', reload);
    gulp.watch(src.html).on('change', reload);
    gulp.watch(src.js).on('change', reload);
}));

gulp.task('default', gulp.series('clean', 'sass', 'watch'));