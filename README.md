#Instructions

1. git clone _______ sitename
2. cd sitename
3. npm i
4. gulp - сборка
   gulp imgOptimiz - оптимизация растровых изображений
   

Структура:
  README.md __ Инструкция и описание
  .gitignore __ Универсальный список игнорируемых файлов и директорий "на все случаи жизни"
  package.json __ файл-манифест, описания и зависимости
  gulpfile.js __ подключенные плагины и тасклист
  
  pug >
    layout __ шаблон(ы) страниц
    global_modules __ модули, повторяющиеся на всех страницах и подключенные в шаблоне
    modules __ модули
    pages __ страницы (формируют страницы при сборке)
    
  static >
    fonts __ шрифты
    img >
      favicon __ фавиконки
      og __ изображения для opengraph
      iconfont __ svg файлы для создания иконочного шрифта
      pic __ растровые изображения под оптимизацию
      svg __ векторные изображения
    js >
      init.js __ инициализации плодключенных плагинов
      main.js __ свой js
    scss >
      _icons_template.scss __ шаблон для создания scss файла _icons.scss
      style.scss __ файл в который подключаются все стиливые файлы
      vendors.scss __ файл в который подключаются все библиотеки и стили подключенных плагинов
      _vars.scss __ sass перемнные
      _mix.scss __ sass миксины
      _icons.scss __ иконочный шрифт (появиться после выаолнения таска iconfont)
      fonts.scss __ шрифты
      basic.scss __ базовые глобальные стили
      
      
Принятые сокращения
  clr__color
  brd__border
  bg __background
  txt__text
  shd__shaddow
  btn__button
  blc__block