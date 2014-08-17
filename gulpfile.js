// load gulp 
var gulp = require('gulp'), 
	concatCSS = require('gulp-concat-css'), 
	minifyCSS = require('gulp-minify-css'); 
gulp.task('minify-css', function() { 
 gulp.src('./public/css/*.css') 
 	.pipe(concatCSS('build.css')) 
 	.pipe(minifyCSS(opts)) 
 	.pipe(gulp.dest('./build/css/')) 
}); 
gulp.task('default', ['minify-css']); 
gulp.task('watch', function(){ // allows us to run 'gulp watch' 
// watch CSS files changes and run the ‘styles’ task on change
gulp.watch('./public/css/*.css', [‘styles']);
}); 