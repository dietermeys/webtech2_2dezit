// load gulp 
var gulp = require('gulp'),  
	minifyCSS = require('gulp-minify-css'),
	pngcrush = require('imagemin-pngcrush');
gulp.task('minify-css', function() { 
 gulp.src('./public/css/*.css') 
 	.pipe(minifyCSS()) 
 	.pipe(gulp.dest('./build/css/')) 
}); 
gulp.task('default', ['minify-css']);