const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

const routes = {
    src: '_assets/img/**/*',
    dest: 'assets/img/',
}

const imageMin = () => (
    gulp.src(routes.src)
    .pipe(imagemin())
    .pipe(gulp.dest(routes.dest))
)

const watch = () => {
    gulp.watch(routes.src, imageMin)
}

exports.dev = gulp.series([imageMin, watch])
exports.default = imageMin
