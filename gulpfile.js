const { src, dest, watch, parallel } = require( 'gulp' );

// CSS
const sass = require( 'gulp-sass' )( require( 'sass' ) );
const plumber = require( 'gulp-plumber' );
const autoprefixer = require( 'autoprefixer' );
const cssnano = require( 'cssnano' );
const postcss = require ( 'gulp-postcss' );
const sourcemaps = require( 'gulp-sourcemaps' )

// Imágenes
const cache = require( 'gulp-cache' );
const imagemin = require( 'gulp-imagemin' );
const webp = require( 'gulp-webp' );
const avif = require( 'gulp-avif' );

// Javascript
const terser = require( 'gulp-terser-js' );

async function css() {
 
  src( 'src/scss/**/*.scss' )  // Identificar el archivo de SASS
    .pipe( sourcemaps.init() )
    .pipe( plumber() )
    .pipe(sass())   // Compilarlo
    .pipe( postcss( [autoprefixer(), cssnano()] ) )
    .pipe( sourcemaps.write( '.' ) )
    .pipe(dest('build/css'));   // Almacenarla
}

async function imagenes() {
  const options = {
    optimizationLevel : 3
  }
  src( 'src/img/**/*.{png,jpg}' )
    .pipe( cache( imagemin( options ) ) )
    .pipe( dest( 'build/img' ) );

}

async function versionWebp() {
  const options = {
    quality : 50
  };

  src( 'src/img/**/*.{png,jpg}' )
    .pipe( webp( options ) )
    .pipe( dest( 'build/img' ) );
}

async function versionAvif() {
  const options = {
    quality : 50
  };

  src( 'src/img/**/*.{png,jpg}' )
    .pipe( avif( options ) )
    .pipe( dest( 'build/img' ) );
}

async function javascript() {
  src( 'src/js/**/*.js' )
    .pipe( sourcemaps.init() )
    .pipe( terser() )
    .pipe( sourcemaps.write( '.' ) )
    .pipe( dest('build/js') );
}

async function dev() {
    watch( 'src/scss/**/*.scss', css );
    watch( 'src/js/**/*.js', javascript );
}

exports.css = css; 
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev );