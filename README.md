# Слайдер анимированный

для сборки на пк раскоментировать gulpfile стр 270

<!-- просто посмотреть тут: https://cyberx.netlify.com/ -->

data-link="" - ссылка на страницу переадресации после завершения анимации, с http
data-time="" - время задержки на последнем слайде перед переадресацией в милисекундах, по умолчанию 500 (0.5сек)
data-animation="" - эфект появления текста:
    spell - эффект печати по одной букве;
    smoothly - эффект плавного появления (не очень для длинных строк);
    transform - эффект плавного увеличения прозрачности и размеров;
    opacity  - любая разметка, просто плавно появляется текст, основное назначение - последний слайд
data-delay="" - задержка перед анимацией текста, по умолчанию 500 мсек
data-text-time="2000" - продолжительность анимации текста, по умолчанию 1500
data-slide-time="3000" - продолжительность одного слайда (трансформации фоновой картинки)
data-transform="20" - в %-х насколько увеличить картинку или текст, по умолчанию для фоновой картинки 10%, для текста 20

data-delay + data-text-time должно быть <= data-slide-time
