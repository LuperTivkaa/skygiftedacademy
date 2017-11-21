//Work flow file
var gulp = require('gulp');
//var inject = require('gulp-inject');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
//var gutil = require('gulp-util');

//Path to files
var paths = {
    projectHOME: './*.php',
    app: 'app/**/*',
    appPHP: 'app/**/*.php',
    appCSS: 'app/**/*.css',
    appJS: 'app/**/*.js',

    // 
    sandbox: './sandbox',
    sandboxCSS: 'sandbox/**/*.css',
    sandboxJS: 'sandbox/**/*.js',

    //
    dist: 'dist',
    distCSS: 'dist/**/*.css',
    distJS: 'dist/**/*.js',
};

//Task to copy all php files from app folder to sandbox for development and testing
gulp.task('copyPHP', function() {
    return gulp.src(paths.appPHP).pipe(gulp.dest(paths.sandbox));
});

//Task to copy all css files from app folder to the sandbox  for development and testing
gulp.task('copyCSS', function() {
    return gulp.src(paths.appCSS).pipe(gulp.dest(paths.sandbox));
});

//Task to copy js  files from app folder to the sandbox for development and testing
gulp.task('copyJS', function() {
    return gulp.src(paths.appJS).pipe(gulp.dest(paths.sandbox));
});
//Task to copy all files at once
gulp.task('copyALL', ['copyPHP', 'copyCSS', 'copyJS'], function() {
    console.log('All files are copied');
});

//inject test case
//TODO: This is working well please change directroy
gulp.task('injectCase', function() {
    var target = gulp.src('app/inc/mainHeader.php');

    var sources = gulp.src(['app/css/frontend.css'], { read: false });

    return target.pipe(inject(sources))
        .pipe(gulp.dest('app/inc/'));
});

//COMPILE SASS TO CSS
// gulp.task('compileFrontendSass', function() {
//     gulp.src("app/scss/frontend.scss")
//         .pipe(sass())
//         .pipe(gulp.dest('app/css'));
// });
gulp.task('mainSass', function() {
    gulp.src("app/scss/sky.scss")
        .pipe(sass())
        .pipe(rename('skygiftedacademy.css'))
        .pipe(gulp.dest('app/css'));
});

//RENAME CODE
//  gulp.src("./src/main/text/hello.txt")
// .pipe(rename("main/text/ciao/goodbye.md"))
// .pipe(gulp.dest("./dist")); // ./dist/main/text/ciao/goodbye.md
//END RENAME

//rename example
// var gulp = require('gulp');
// var rename = require('gulp-rename');

// gulp.task('default', function() {
//   return gulp.watch('../**/**.js', function(obj) {
//     gulp.src(obj.path)
//       .pipe(rename('newFileName.js'))
//       .pipe(gulp.dest('.'));
//   });
// });
//end rename example

//watch Sass
gulp.task('watchFiles', function() {
    gulp.watch('app/**/*.scss', ['mainSass']);
    gulp.watch([
        'app/js/app.js',
        'app/js/routines.js'
    ], ['concatScripts']);
});

//task to concat javascript files
gulp.task('concatScripts', function() {
    return gulp.src(['app/js/app.js',
            'app/js/routines.js',
        ])
        .pipe(concat('main.js'))
        //.pipe(rename('main.js'))
        .pipe(gulp.dest('app/js'));

});
//Task to minify
gulp.task('minifyScripts', function() {
    return gulp.src(['app/js/scoresheet.js'])
        .pipe(uglify())
        .on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(rename('scoresheet.min.js'))
        .pipe(gulp.dest('app/js'));

});