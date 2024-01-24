const gulp = require("gulp");
const html_min = require("gulp-htmlmin");
const gulp_sass = require("gulp-dart-sass");
const cleanCSS = require('gulp-clean-css');
const minify = require("gulp-minify");

const { pipeline } = require("node:stream/promises")

const config = { source: "./src", outdir: "./build" }

async function minifyHTML() {
  return pipeline(
    gulp.src("./src/**/*.html"),

    html_min({
      collapseWhitespace: true,
      removeComments: true
    }),
  
    gulp.dest(config.outdir)
  );
}

async function handleSass(cb) {
  return pipeline(
    gulp.src("./src/**/*.scss"),
    
    gulp_sass.sync({ 
      outFile: "compressed",
      includePaths: ["./src/public/"],
    }),

    cleanCSS({
      sourceMap: true,
      compatibility: "ie8"
    }),
    
    gulp.dest(config.outdir)
  );
}

async function handleJsFiles(cb) {
  return pipeline(
    gulp.src("./src/**/*.js"),

    minify({
      preserveComments: false,
      ext: {
        min: ".js",
        src: ".src.js"
      },
    }),

    gulp.dest(config.outdir)
  );
}

function watch(cb) {
  gulp.watch(["./src/**/*.html"], minifyHTML);
  gulp.watch(["./src/**/*.scss"], handleSass);
  gulp.watch(["./src/**/*.js"], handleJsFiles);
};


exports.minifyHTML = minifyHTML;
exports.handleSass = handleSass;
exports.handleJsFiles = handleJsFiles;

exports.default = gulp.parallel(minifyHTML, handleSass, handleJsFiles)
exports.watch = watch