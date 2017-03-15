const gulp = require('gulp');
const sync = require('run-sequence');
const browser = require('browser-sync');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');

const paths = {
    entry: 'client/app/app.js',
    app: ['client/app/**/*.{js,scss,html}', 'client/styles/**/*.scss'],
    js: 'client/app/**/*!(.spec.js).js',
    sass: ['client/app/**/*.scss', 'client/style/**/*.scss'],
    toCopy: ['client/index.html', 'client/assets/images/*'],
    html: ['client/index.html', 'client/app/**/*.html'],
    dest: 'dist'
};

// for e2e-tests
const protractor = require('gulp-protractor').protractor;

gulp.task('lint', () => gulp.src(['client/app/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('build', ['lint'], () => gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.dest))
);

gulp.task('serve', () => {
    browser({
        port: process.env.PORT || 4500,
        open: false,
        ghostMode: false,
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('copy', () => gulp
    .src(paths.toCopy, {base: 'client/'})
    .pipe(gulp.dest(paths.dest))
);

gulp.task('watch', () => {
    gulp.watch(paths.app, ['build', browser.reload]);
    gulp.watch(paths.toCopy, ['copy', browser.reload]);
});

gulp.task('default', (done) => {
    sync('build', 'copy', 'serve', 'watch', done);
});

const $ = require('gulp-load-plugins')();

gulp.task('webdriver_update', function(cb){
    return require('gulp-protractor').webdriver_update(cb);
});

gulp.task('webdriver-standalone', $.protractor.webdriver_standalone);

//tests configuration
gulp.task('e2e', [], function () {
    gulp.src(['tests/e2e/**/*.js'], { read:false })
        .pipe(protractor({
            configFile: "client/tests/e2e/protractor.config.js",
            args: ['--baseUrl', 'http://127.0.0.1:4500']
        }))
        .on('error', function (e) {
            console.log(e);
            throw e
        })
});