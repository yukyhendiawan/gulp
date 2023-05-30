const { src, dest } = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
// this package didn't work and was replaced by pump
// const pipeline = require('readable-stream').pipeline;
const pump = require('pump');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

// task copy scripts
function copyScripts() {
	return src('src/assets/js/**/*.js')
		.pipe(sourcemaps.init()) // Initial sourcemaps
		.pipe(babel({
			presets: ['@babel/env'] // Convert JavaScript code from new version of ES6+
		}))
		.pipe(sourcemaps.write('.')) // Generate sourcemaps
		.pipe(dest('assets/js')); // Output JS and sourcemaps
}

// task minify js
function minifyScripts() {
	return pump(
		[
			src('src/assets/js/**/*.js'),
			sourcemaps.init(), // Initial sourcemaps
			babel({
				presets: ['@babel/env'] // Convert JavaScript code from new version of ES6+
			}),
			uglify(), // For minification and compression of JavaScript code
			rename({ suffix: '.min' }), // Rename file with .min suffix
			sourcemaps.write('.'), // Generate sourcemaps
			dest('assets/js') // Output minified JS and sourcemaps
		],
		(err) => {
			if (err) console.error(err); // Error information
		}
	);
}

const scriptTasks = {
	copyScripts,
	minifyScripts
};

module.exports = scriptTasks;