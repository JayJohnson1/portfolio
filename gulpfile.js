/**
* Configuration.
*
* Project Configuration for gulp tasks.
*
* Edit the variables as per your project requirements.
*/

var project             = 'portfolio'; // Name

var styleSRC            = './assets/src/scss/styles.scss'; // Path to main .scss file
var styleDestination    = './assets/dest/css/'; // Path to place the compiled CSS file
// Default set to root folder

var styleWatchFiles     = './assets/src/scss/**/*.scss'; // Path to all *.scss files inside css folder and inside them

/**
 * Load Plugins.
 *
 * Load gulp plugins and assing them semantic names.
 */
var gulp         = require('gulp'), // Gulp of-course
    browserSync  = require('browser-sync'), // Asynchronous browser loading on .scss file changes
    reload       = browserSync.reload,

    // CSS related plugins.
    sass         = require('gulp-sass'), // Gulp pluign for Sass compilation
    autoprefixer = require('gulp-autoprefixer'), // Autoprefixing magic
    concatCss    = require('gulp-concat-css'), // concat css
    minifycss    = require('gulp-uglifycss'), // Minifies CSS files
    filter       = require('gulp-filter'), // Enables you to work on a subset of the original files by filtering them using globbing
    cmq          = require('gulp-combine-media-queries'),

    // JS related plugins.
    concat       = require('gulp-concat'), // Concatenates JS files
    uglify       = require('gulp-uglify'), // Minifies JS files

    // Utility related plugins.
    rimraf       = require('gulp-rimraf'), // Helps with removing files and directories in our run tasks
    imagemin     = require('gulp-imagemin'), // Minifies PNG, JPEG, GIF and SVG images
    newer        = require('gulp-newer'), // For passing through only those source files that are newer than corresponding destination files
    plumber      = require('gulp-plumber'), // Fix node pipes, prevent them from breaking due to an error
    cache        = require('gulp-cache'),
    notify       = require('gulp-notify'); // Sends message notification to you

/**
 * Browser Sync
 *
 * Asynchronous browser syncing of assets across multiple devices!! Watches for changes to js, image and html files
 * Although, I think this is redundant, since we have a watch task that does this already.
*/
gulp.task('browser-sync', function() {
    var files = [
            '**/*.html',
            '**/*.{png,jpg,gif}'
            ];
    browserSync.init(files, {

        // Read here http://www.browsersync.io/docs/options/

        // proxy: 'http://localhost/portfolio-new/',


        // port: 8080,



        server: true,

        // Tunnel the Browsersync server through a random Public URL
        // tunnel: true,

        // Attempt to use the URL "http://my-private-site.localtunnel.me"
        // tunnel: "ppress",

        // Inject CSS changes
        injectChanges: true

    });
});

/**
 * Task: styles
 *
 * Compiles Sass.
 */
gulp.task('styles', function () {
    gulp.src( styleSRC )
        .pipe(plumber())
        .pipe( sass( {
            errLogToConsole: true,
            // outputStyle: 'compact',
            outputStyle: 'compressed'
            // outputStyle: 'nested',
            // outputStyle: 'expanded',
            // precision: 10
        }))
        .pipe( autoprefixer(
            'last 2 version',
            '> 1%',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4' ) )
        .pipe(plumber.stop())
        .pipe( gulp.dest( styleDestination ) )
        .pipe(browserSync.stream())
        .pipe( notify( { message: 'TASK: "styles" Completed!', onLast: true } ) )
});

/**
 * Clean gulp cache
 */
 gulp.task('clear', function () {
   cache.clearAll();
 });

/**
  * Watch Tasks.
  *
  * Watches for file changes and runs specific tasks.
  */

 gulp.task( 'default', [ 'styles', 'browser-sync' ], function () {
    gulp.watch( './assets/src/scss/**/*.scss', [ 'styles', browserSync.reload ] );
 });
