var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    babel = require('babelify'),
    reload = browserSync.reload,
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    concat = require('gulp-concat'),
    imageMin = require('gulp-imagemin'),
    cleanCSS = require('gulp-clean-css'),
    cssnano = require('cssnano'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    uglify = require('gulp-uglify');

gulp.task('bs', function () {
    browserSync.init({
        server: '.'
    });
});

gulp.task('styles', function () {
    return gulp.src('src/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/'))
        .pipe(reload({ stream: true }));
});

gulp.task('js', function () {
    return browserify({
        extensions: ['.js'],
        entries: ['./src/scripts/app.js'],
        sourceType: 'module',
        debug: true
    })
        .transform('babelify', {
            sourceMaps: true,
            presets: ['env']
        })
        .bundle()
        .pipe(source('scripts/app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('public/'))
        .pipe(reload({ stream: true }));
});

gulp.task('images', function () {
    gulp.src('src/assets/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest('public/images'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function () {
    gulp.watch(['src/**/*.js'], gulp.series('js'));
    gulp.watch('src/**/*.scss', gulp.series('styles'));
    gulp.watch('index.html', reload);
});

gulp.task('default', gulp.series(gulp.parallel('watch', 'styles', 'bs', 'js', 'images'), function () { }));