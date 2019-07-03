document.addEventListener("DOMContentLoaded", ready);

function ready() {
    var slider = document.querySelector('.js-slider');

    if (slider) {
        new Slider(slider);
    }
}

class Slider {
    constructor($el) {
        this.$element = $el;
        this.$slides = $el.querySelectorAll('.slider-item');
        this.$textItems = $el.querySelectorAll('.slider-item-text');
        this.$text = [];
        this.$arrayParams = [];
        this.$time = (this.$element.dataset.time && this.$element.dataset.time != '') ? parseInt(this.$element.dataset.time) : 500; // задержка перед переадресацией
        this.$link = (this.$element.dataset.link && this.$element.dataset.link != '') ? this.$element.dataset.link : ''; //ссылка для перехода на др. страницу
        
        this.setSliderParam();
        this.startAnimation2();
    }

    setSliderParam() {
        
        for (let i = 0; i < this.$textItems.length; i++) {
            if (this.$textItems[i].getElementsByTagName('span')[0]) {
                this.$text[i] = this.$textItems[i].getElementsByTagName('span')[0];
                 
            } else {
                this.$text[i] = null;
                this.$textItems[i].classList.add('is-opacity');
            }

            let parent = this.$textItems[i];
            this.$arrayParams[i] = {
                text: this.$text[i] != null ? this.$text[i].innerText : '',
                textTime: parseInt((parent.dataset.textTime && parent.dataset.textTime != '') ? parent.dataset.textTime : 1500), // время анимирования текста (уже с задержкой)
                slideTime: parseInt((parent.dataset.slideTime && parent.dataset.slideTime != '') ? parent.dataset.slideTime : 3000), // время слайда
                animation: (parent.dataset.animation && parent.dataset.animation != '') ? parent.dataset.animation : 'smoothly',
                delay: parseInt((parent.dataset.delay && parent.dataset.delay != '') ? parent.dataset.delay : 500), //задержка перед анимированием текста
                transform: parseInt((parent.dataset.transform && parent.dataset.transform != '') ? parent.dataset.transform : 20),
                transformImg: parseInt((this.$slides[i].dataset.transform && this.$slides[i].dataset.transform != '') ? this.$slides[i].dataset.transform : 10)
            }
        }
        console.log(this.$arrayParams);
        
    }

    startAnimation2() {
        let time = 0;
        for (let i = 0; i < this.$slides.length; i++) {
            i > 0 ? time += this.$arrayParams[i-1].slideTime : 0;

            setTimeout(() => {
                this.changeImages(i);
                if (this.$arrayParams[i].animation == 'transform') {
                    this.$text[i].classList.add('transform-start');
                }
                setTimeout(() => {
                    if (this.$arrayParams[i].animation == 'transform') {
                        this.changeTextTransform(i);
                    } else if (this.$arrayParams[i].animation == 'spell') {
                        this.setText(i);
                        this.changeTextSpell(i, this.$arrayParams[i].textTime);
                    } else if (this.$arrayParams[i].animation == 'smoothly') {
                        this.cloneText(i);
                        this.changeTextWidth(i);

                    } else if (this.$arrayParams[i].animation == 'opacity') {
                        this.deleteOldClasses(i);
                        this.$textItems[i].classList.remove('is-opacity');
                    }
                }, this.$arrayParams[i].delay);

            }, time);
        }
        time += this.$arrayParams[this.$slides.length - 1].slideTime + this.$time;

        if (this.$link != '') {
            setTimeout(() => {
                window.location.href = this.$link;
            }, time);
        }
        // else {
        //     console.log(time);
        //     setTimeout(() => {
        //         alert('stop');
        //     }, time);
        // }
    }

    setText(i) {
        i > 0 ? this.$text[i-1].style.display = 'none' : null;
        this.$text[i].innerText = '';
        this.$text[i].classList.add('for-spell');
    }

    changeTextSpell(i, time) {
        this.deleteOldClasses(i);
        let wdth = this.$arrayParams[i].text.length;
        for (let j = 0; j < wdth; j++) {
            setTimeout(() => {
                this.$text[i].innerText = this.$arrayParams[i].text.substring(0, j + 1);

            }, j * time / wdth);
        }
    }

    changeImages(i) {
        let k = (this.$arrayParams[i].transformImg + 100) / 100;
        this.$slides[i].style.transform = "scale(" + k + "," + k + ")";
        this.$slides[i].style.transitionDuration = this.$arrayParams[i].slideTime / 1000 + 's';
        this.$slides[i].classList.add('active');
    }

    changeTextTransform(i) {
        this.deleteOldClasses(i);
        let k = (this.$arrayParams[i].transform + 100) / 100;
        this.$text[i].style.transform = "scale(" + k + "," + k + ")";
        this.$text[i].classList.add('for-transform');
        this.$text[i].style.transitionDuration = (this.$arrayParams[i].textTime) / 1000 + 's';
    }

    cloneText(i) {
        let cloneSpan = document.createElement('span');
        cloneSpan.classList.add('clone-text');
        cloneSpan.innerHTML = this.$arrayParams[i].text.split(' ').join('&nbsp;');
        this.$text[i].appendChild(cloneSpan);
    }

    changeTextWidth(i) {
        this.deleteOldClasses(i);
        let itemWidth = this.$text[i].offsetWidth;
        for (let j = 1; j <= itemWidth; j++) {
            setTimeout(() => {
                this.$text[i].getElementsByClassName('clone-text')[0].style.width = j + 'px';
            }, j * this.$arrayParams[i].textTime / itemWidth);
        }
    }

    deleteOldClasses(i) {
        if (i > 0) {
            if (this.$text[i - 1] != null) {
                this.$text[i - 1].style.display = 'none';
                this.$text[i - 1].classList.contains('for-smoothly') ? this.$text[i - 1].classList.remove('for-smoothly') : null;
                this.$text[i - 1].classList.contains('for-spell') ? this.$text[i - 1].classList.remove('for-spell') : null;
                this.$text[i - 1].classList.contains('for-transform') ? this.$text[i - 1].classList.remove('for-transform') : null;
            } else {
                this.$textItems[i-1].classList.add('is-opacity');
                this.deleteOldClasses(i-1);
            }
        }
    }
}