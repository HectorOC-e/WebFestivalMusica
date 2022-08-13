const { src, dest, watch } = require( "gulp" );
const sass = require( "gulp-sass" )( require( "sass" ) );
const plumber = require( 'gulp-plumber' );

async function css() {
 
  src("src/scss/**/*.scss")  // Identificar el archivo de SASS
    .pipe( plumber() )
    .pipe(sass())   // Compilarlo
    .pipe(dest("build/css"));   // Almacenarla
}

async function dev() {
    watch( "src/scss/**/*.scss", css );
}

exports.css = css;
exports.dev = dev;