var gulp = require('gulp');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/beacon_foundation.scss')
    .pipe(sourcemaps.init())
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('css'))
     .pipe(connect.reload());;
});

gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('watchFiles', function(){
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch(['css/beacon_foundation.css', 'beacon_foundation/templates/**/*.twig', '*.html'])
});

gulp.task('default', ['watchFiles', 'connect']);
