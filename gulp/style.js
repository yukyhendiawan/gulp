const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

function compileSass() {
	return src('src/assets/sass/*.scss')
		.pipe(sourcemaps.init()) // Initial sourcemaps
		.pipe(sass().on('error', sass.logError)) // Compile SASS
		.pipe(dest('assets/css')) // Output unminified CSS
		.pipe(cleanCSS()) // Minify CSS
		.pipe(rename({ suffix: '.min' })) // Rename file with .min suffix
		.pipe(sourcemaps.write('.')) // Generate sourcemaps
		.pipe(dest('assets/css')); // Output minified CSS and sourcemaps
}

function watchSass() {
	watch('src/assets/sass/**/*.scss', compileSass); // Watch SASS
}

const styleTasks = {
	compileSass,
	watchSass
};

module.exports = styleTasks;