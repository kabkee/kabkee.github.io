const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

const routes = {
    src: '_assets/img/**/*',
    dest: 'assets/img/',
}

exports.default = () => (
    gulp.src(routes.src)
    .pipe(imagemin())
    .pipe(gulp.dest(routes.dest))
);
