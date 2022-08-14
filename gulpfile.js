const { src, dest, watch, parallel } = require( 'gulp' );

// CSS
const sass = require( 'gulp-sass' )( require( 'sass' ) );
const plumber = require( 'gulp-plumber' );


// Imágenes
const cache = require( 'gulp-cache' );
const imagemin = require( 'gulp-imagemin' );
const webp = require( 'gulp-webp' );

async function css() {
 
  src( 'src/scss/**/*.scss' )  // Identificar el archivo de SASS
    .pipe( plumber() )
    .pipe(sass())   // Compilarlo
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

async function dev() {
    watch( 'src/scss/**/*.scss', css );
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.dev = parallel( imagenes, versionWebp, dev );