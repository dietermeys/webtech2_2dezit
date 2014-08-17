// load gulp 
var gulp = require('gulp'),  
	minifyCSS = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	pngcrush = require('imagemin-pngcrush');
gulp.task('minify-css', function() { 
 gulp.src('./public/css/*.css') 
 	.pipe(minifyCSS()) 
 	.pipe(gulp.dest('./build/css/')) 
}); 
gulp.task('default', ['minify-css']);
gulp.task('default', function () {
    return gulp.src('*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('dist'));
});