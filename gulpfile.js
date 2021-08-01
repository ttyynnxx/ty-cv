var gulp = require("gulp");
var rev = require("gulp-rev"); // 给每个文件计算hash码，修改文件名
var revReplace = require("gulp-rev-replace");
var useref = require("gulp-useref");
var filter = require("gulp-filter");
var uglify = require("gulp-uglify");
var csso = require("gulp-csso");
const imagemin = require("gulp-imagemin");

gulp.task("default", function () {
  var jsFilter = filter("**/*.js", { restore: true });
  var cssFilter = filter("**/*.css", { restore: true });
  var imgFilter = filter("**/*.{png,jpg,gif,ico,jpeg}", { restore: true });
  var indexHtmlFilter = filter(["**/*", "!**/index.html"], { restore: true });

  return gulp
    .src("src/index.html")
    .pipe(useref())
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(csso())
    .pipe(cssFilter.restore)
    .pipe(imgFilter)
    .pipe(
      imagemin([
        // imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(imgFilter.restore)
    .pipe(indexHtmlFilter)
    .pipe(rev())
    .pipe(indexHtmlFilter.restore)
    .pipe(revReplace())
    .pipe(gulp.dest("dist"));
});
