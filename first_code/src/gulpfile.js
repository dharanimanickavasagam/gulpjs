const gulp = require('gulp');
const image = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const watch = require('gulp-watch');


gulp.task('log', async function() {
    return console.log("I am from gulp");
});


/*
gulp.task() - defines tasks
gulp.src() - points what files to use 
gulp.dest() - points the folder to output 
gulp.watch() - watches for the changes 
*/


gulp.task('copyhtml', async function() {
    return gulp.src('*.html')
        .pipe(gulp.dest('../build'));
});


// Minifies the images 
gulp.task('imagemin', () => {
    return gulp.src('../images/*')
        .pipe(image())
        .pipe(gulp.dest('../build/images'));
});


// Minifies the JS 
gulp.task('minify', () => {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../build/js'));
});


// gulp-sass
gulp.task('sass', () => {
    gulp.src('sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('../build/css'));
});


gulp.task('concat', () => {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../build/concat'));
});

gulp.task('watch', () => {
    return gulp.watch('js/*.js', gulp.series['minify']);

});


/* default task of gulp  
gulp.task('default', async function() {
    return console.log("I am from gulp");
});
*/

// Runs all the tasks in a single command - gulp 
gulp.task('default', gulp.series(['copyhtml', 'minify', 'concat', 'sass']));