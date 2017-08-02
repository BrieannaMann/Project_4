var gulp = require("gulp");
var gutil = require("gulp-util");
var notify = require('gulp-notify');
var source = require("vinyl-source-stream");
var buffer = require('vinyl-buffer');
var browserify = require("browserify");
var watchify = require("watchify");
var babelify = require("babelify");


var browserSync = require("browser-sync").create();

var ENTRY_FILE = "./src/js/index.js";
var OUTPUT_DIR = "./build/js";
var OUTPUT_FILE = "bundle.js";
var DELAY = 50;

var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');

gulp.task("watch", function () {
   var b = browserify({ entries: [ ENTRY_FILE ] }).transform(babelify);
   b.transform(babelify.configure({ presets: ["es2015"] }));

   function bundle() {
       b.bundle()
       .on("log", gutil.log)
       .on("error", notify.onError())
       .pipe(source(OUTPUT_FILE))
       .pipe(buffer())
       .pipe(gulp.dest(OUTPUT_DIR))
       .pipe(browserSync.reload({ stream: true }));

   }


   watchify(b, { delay: DELAY }).on("update", bundle);
   bundle();
});


gulp.task('scss', function () {
   return gulp.src('./src/scss/*.scss')
       .pipe(sass().on('error', sass.logError))
       .pipe(concat('main.css'))
       .pipe(minifyCSS())
       .pipe(gulp.dest('./build/css/'));
});
// browser sync, static server
gulp.task("serve", function () {
   browserSync.init({
       server: {
           baseDir: "./build"
       }
   });
   gulp.watch('./src/scss/*.scss', ['scss']);
   gulp.watch(['./build/*.html', './build/css/*.css']).on('change', browserSync.reload);
});
gulp.task("default", [ "watch", "serve" ]);


