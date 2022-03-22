'use strict'; //строгий режим

/*зависимости*/
//подключаем зависимости
var gulp = require('gulp'), // сам gulp
    browserSync = require('browser-sync').create(), //синхронизация с браузером
    notify = require('gulp-notify'), //вывод ошибок в консоль терминала
    plumber = require('gulp-plumber'), //поиск ошибок
    sass = require('gulp-sass'), // компилятор sass
    tingpng = require('gulp-tinypng'), // оптимизация png и jpg
    sourcemaps = require('gulp-sourcemaps'), // карта минифицированного файла
    autoprefixer = require('gulp-autoprefixer'), // автопрефиксер
    csso = require('gulp-csso'), //очистка и минификация
    concat = require('gulp-concat'), //объединение и минификация js
    replace = require('gulp-replace'),
    pug = require('gulp-pug'), // компилятор pug
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css-with-types'),
    fontName = 'iconfont';

/*таски*/

//таск serve
gulp.task('serve', function(){
  browserSync.init({
    server: {
	 baseDir: './build'
    }
  });
});

//таск pug
gulp.task('pug', function(){
  return gulp.src('src/pug/pages/*.pug')
    .pipe(plumber({
      errorHandler: notify.onError(function(err){
        return {
          title: 'Pug',
          message: err.message
        }
      })
    })) //поиск ошибок и вывод их в консоль терминала
    .pipe(pug({
      pretty: true //опция делает скомпилированый код с отступами а не в одну строку
    }))
    .pipe(gulp.dest('build')) //директория куда складывать скомпилированые файлы
    .on('end', browserSync.reload);
});

//таск sass
gulp.task('sass', function() {
  return gulp.src('src/static/scss/style.scss')
    .pipe(sourcemaps.init())// инициируем сорсмап
    .pipe(plumber({
      errorHandler: notify.onError(function(err){
        return {
          title: 'Styles',
          message: err.message
        }
      })
    }))//поиск ошибок и вывод их в консоль терминала
    .pipe(sass())// компилятор sass
    .pipe(autoprefixer({
      cascade: false
    }))// автопрефиксер
    .pipe(csso())//очистка и минификация
    .pipe(sourcemaps.write())// записываем сорсмап
    .pipe(gulp.dest('build/css/')) //директория куда складывать скомпилированые файлы
    .pipe(browserSync.reload({
      stream: true
    }));
});

//таск vendors
//gulp.task('vendors', function(){
//  return gulp.src([
//    'node_modules/jquery/dist/jquery.min.js',
//    'node_modules/slick-carousel/slick/slick.min.js'
//  ])
//    .pipe(concat('vendors.min.js'))
//    .pipe(gulp.dest('build/js/')) //директория куда складывать скомпилированые файлы
//    .pipe(browserSync.reload({
//      stream: true
//    }));
//});

//таск scripts
gulp.task('scripts', function(){
  return gulp.src([		
    'src/static/js/init.js',
    'src/static/js/main.js'
  ])
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('build/js/')) //директория куда складывать скомпилированые файлы
    .pipe(browserSync.reload({
      stream: true
    }));
});

//таск imgOptimiz
gulp.task('imgOptimiz', function(){
  return gulp.src('src/static/img/pic/**/*')
    .pipe(tingpng('hwgYyJfq6xpD48zZDrzwQ4tnrTK2JDKj'))
    .pipe(gulp.dest('build/img/pic/'))
});

//таск pic, favicon, og, svg
gulp.task('pic', function() {
  return gulp.src('src/static/img/pic/**/*')      
    .pipe(gulp.dest('build/img/pic/'))
    .pipe(browserSync.reload({
      stream: true
  }));
});
gulp.task('favicon', function() {
  return gulp.src('src/static/img/favicon/*')      
    .pipe(gulp.dest('build/img/favicon/'))
    .pipe(browserSync.reload({
      stream: true
  }));
});
gulp.task('og', function() {
  return gulp.src('src/static/img/og/*')      
    .pipe(gulp.dest('build/img/og/'))
    .pipe(browserSync.reload({
      stream: true
  }));
});
gulp.task('svg', function() {
  return gulp.src('src/static/img/svg/*')      
    .pipe(gulp.dest('build/img/svg/'))
    .pipe(browserSync.reload({
      stream: true
  }));
});

//таск fonts
gulp.task('fonts', function() {
  return gulp.src('src/static/fonts/*')      
    .pipe(gulp.dest('build/fonts/'))
    .pipe(browserSync.reload({
      stream: true
  }));
});

//таск iconfont
gulp.task('iconfont', function(){
  return gulp.src(['src/static/img/iconfont/*.svg'])
    .pipe(iconfontCss({
      path: 'src/static/scss/_icons_template.scss',
      fontName: fontName,
      targetPath: '../scss/_icons.scss',
      fontPath: '../fonts/'
    }))
    .pipe(iconfont({
      fontName: fontName
    }))
    .pipe(gulp.dest('src/static/fonts/'))
    .pipe(browserSync.reload({
      stream: true
    }));
}, ['fonts', 'sass']);

//таск watch
gulp.task('watch', function() {
  gulp.watch('src/pug/**/*', gulp.series('pug'));
  gulp.watch('src/static/scss/**/*', gulp.series('sass'));
  gulp.watch('src/static/js/*.js', gulp.series('scripts'));
  gulp.watch('src/static/img/pic/*', gulp.series('pic'));
  gulp.watch('src/static/img/favicon/*', gulp.series('favicon'));
  gulp.watch('src/static/img/og/*', gulp.series('og'));
  gulp.watch('src/static/img/svg/*', gulp.series('svg'));
  gulp.watch('src/static/fonts/*', gulp.series('fonts'));
  gulp.watch('src/static/img/svg/*.svg', gulp.series('svg'));
});

//дефолтный таск, запускаемый по команде gulp
gulp.task('default', gulp.series(
  gulp.parallel('iconfont'), //параллельный запуск тасков
  gulp.parallel('pug', 'sass', /*'vendors',*/ 'scripts', 'pic', 'favicon', 'og', 'svg', 'fonts'), //параллельный запуск тасков
  gulp.parallel('watch', 'serve') //параллельный запуск тасков после выполнения предыдущих
));