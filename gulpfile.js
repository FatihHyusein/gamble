"use strict";

const gulp = require('gulp');
const babel = require('babelify');
const connect = require('gulp-connect'); //Runs a local dev server
const open = require('gulp-open'); //Open a URL in a web browser
const browserify = require('browserify'); // Bundles JS
const source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
const concat = require('gulp-concat'); //Concatenates files
const lint = require('gulp-eslint'); //Lint JS files, including JSX
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sftp = require('gulp-sftp');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

const config = {
    port: 3000,
    devBaseUrl: 'http://www.csgomuffin.com/',
    paths: {
        staticFiles: './staticFiles/**/*.*',
        html: './src/*.php',
        js: './src/**/*.js',
        scss: './src/**/*.scss',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'main.css'
        ],
        dist: '.',
        // mainScss: './dist/scss/style.scss',
        mainCss: './dist/scss/style.css',
        mainJs: './src/main.js',
        mainScss: './src/main.scss'
    }
};

gulp.task('apply-prod-environment', function () {
    process.env.NODE_ENV = 'production';
});

//Start a local development server
gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

//Open when is connected
gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.php')
        .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

//copy the main index.php file to build folder
gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

//copy static files
// gulp.task('staticFiles', function () {
//     gulp.src(config.paths.staticFiles)
//         .pipe(gulp.dest(config.paths.dist + '/staticFiles'))
//         .pipe(connect.reload());
// });

//concat, compile jsx/es6 and copy to build folder
gulp.task('js', function () {
    browserify(config.paths.mainJs)
        .transform(babel)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))


        .pipe(gulp.dest(config.paths.dist))


        .pipe(connect.reload());
});

gulp.task('compress', function () {
    return gulp.src(config.paths.dist + '/bundle.js')
        .pipe(uglify())
        .pipe(gulp.dest('min'));
});

//concat sass files into one sass file
gulp.task('concatSass', function () {
    // return gulp.src(config.paths.scss)
    //     .pipe(sass().on('error', sass.logError))
    //     .pipe(autoprefixer({
    //         browsers: ['last 2 versions', 'Safari >= 8'],
    //         cascade: false
    //     }))
    //     .pipe(concat('/'))
    //     .pipe(gulp.dest(config.paths.mainScss));
});

//compile main sass file
gulp.task('sass', ['concatSass'], function () {
    return gulp.src(config.paths.mainScss)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Safari >= 8'],
            cascade: false
        }))
        .pipe(gulp.dest(config.paths.dist))
        ;
});

//concat css files
gulp.task('css', ['sass'], function () {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))

        .pipe(cleanCSS({compatibility: 'ie8'}))

        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

//check if rules meet written
gulp.task('lint', function () {
    return gulp.src(config.paths.js)
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
});

// gulp.task('upload', function () {
//
//     return gulp.src(config.paths.dist + '/**/*')
//         .pipe(sftp( ));
// });

//watch for changes and update the page
gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
    gulp.watch(config.paths.scss, ['css']);
    // gulp.watch(config.paths.staticFiles, ['staticFiles']);
    // gulp.watch(config.paths.dist + '/**/*', ['upload']);
});

gulp.task('default', ['html', 'js', 'css', 'lint', 'watch']);
