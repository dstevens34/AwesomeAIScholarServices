var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');

var DEST = 'dist';

gulp.task('copy-index', function () {
    gulp.src('frontend/index.html')
        .pipe(gulp.dest(DEST));
});

gulp.task('concat', function () {
    var DEPENDENCIES = [
        'node_modules/angular/angular.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        'node_modules/lodash/lodash.js'
    ];
    var FILES = ['frontend/**/*-module.js', 'frontend/**/*-config.js', 'frontend/**/*.js'];

    gulp.src(DEPENDENCIES.concat(FILES))
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DEST))
        .pipe(connect.reload());
});

gulp.task('concat-css', function () {
    var FILES = [
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/bootstrap/dist/css/bootstrap-theme.css',
        'frontend/**/*.css'
    ];
    gulp.src(FILES)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(DEST));
});

gulp.task('templates', function () {
    return gulp.src('frontend/**/*.html')
        .pipe(templateCache({ standalone: true }))
        .pipe(gulp.dest(DEST))
        .pipe(connect.reload());
});



gulp.task('webserver', function () {
    connect.server({
        livereload: true,
        root: [DEST]
    });
});

gulp.task('watch', function () {
    gulp.watch('frontend/index.html', ['copy-index']);
    gulp.watch('frontend/**/*.js', ['concat']);
    gulp.watch('frontend/**/*.html', ['templates']);
    gulp.watch('frontend/**/*.css', ['concat-css']);
});

gulp.task('default', ['copy-index', 'concat', 'concat-css', 'templates']);

gulp.task('dev', ['default', 'webserver', 'watch']);