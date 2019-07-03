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
        this.$text = $el.querySelectorAll('.slider-item-text > span');
        this.$arrayParams = [];
        // this.$time = (this.$element.dataset.time && this.$element.dataset.time != '') ? this.$element.dataset.time : 2000;
        this.$link = (this.$element.dataset.link && this.$element.dataset.link != '') ? this.$element.dataset.link : ''; //ссылка для перехода на др. страницу
        // this.$transform = (this.$element.dataset.transform && this.$element.dataset.transform != '') ? this.$element.dataset.transform : 20; //ссылка для перехода на др. страницу
        
        
        this.setSliderParam();
        // this.startAnimation();
    }

    setSliderParam() {
        for (let i = 0; i < this.$text.length; i++) {
            let parent = this.$text[i].parentNode;
            this.$arrayParams[i] = {
                text: this.$text[i].innerText,
                time: parseInt((parent.dataset.time && parent.dataset.time != '') ? parent.dataset.time : 2000),
                animation: (parent.dataset.animation && parent.dataset.animation != '') ? parent.dataset.animation : 'smoothly',
                delay: parseInt((parent.dataset.delay && parent.dataset.delay != '') ? parent.dataset.delay : 0), //задержка перед анимированием текста
                transform: parseInt((parent.dataset.transform && parent.dataset.transform != '') ? parent.dataset.transform : 20)
            } 
        }
        console.log(this.$arrayParams);
        
    }

    startAnimation() {
        if (this.$animation == 'smoothly') {
            this.cloneTextSpan();
            for (let i = 0; i < this.$slides.length; i++) {
                setTimeout(() => {
                    this.changeImages(i);
                    setTimeout(() => {
                        this.changeTextWidth(i);
                    }, this.$delay);
                }, i * this.$time);
            }
        } else if (this.$animation == 'spell') {
            this.setTextArray();
            for (let i = 0; i < this.$slides.length; i++) {
                setTimeout(() => {
                    this.changeImages(i);
                    setTimeout(() => {
                        this.changeTextSpell(i);
                    }, this.$delay);
                }, i * this.$time);
            }
        }
        else if (this.$animation == 'transform') {           
            for (let i = 0; i < this.$text.length; i++) {
                this.$text[i].classList.add('transform-start');
            }
            for (let i = 0; i < this.$slides.length; i++) {
                setTimeout(() => {
                    this.changeImages(i);
                    setTimeout(() => {
                        this.changeTextTransform(i);
                    }, this.$delay);
                }, i * this.$time);
            }
        }
        if (this.$link != '') {
            setTimeout(() => {
                window.location.href = this.$link;
            }, this.$slides.length * this.$time + 500);
        }
    }

    setTextArray() {
        for (let i = 0; i < this.$text.length; i++) {
            this.$textArray[i] = this.$text[i].innerText;
            this.$text[i].innerText = '';
            this.$text[i].classList.add('for-spell');
        }
    }

    changeTextTransform(i) {
        if (i > 0) {
            this.$text[i - 1].style.display = 'none';
            this.$text[i - 1].classList.remove('for-transform');
        }
        let k = (parseInt(this.$transform) + 100) / 100;
        if (this.$transform != 20) {
            this.$text[i].style.transform = "scale(" + k + "," + k + ")";
        }
        this.$text[i].classList.add('for-transform');
        this.$text[i].style.transitionDuration = (this.$time - this.$delay) / 1000 + 's';
    }

    changeTextSpell(i) {
        if (i > 0) {
            this.$text[i - 1].classList.remove('for-spell');
        }
        let wdth = this.$textArray[i].length;
        for (let j = 0; j<wdth; j++) {
            setTimeout(() => {
                this.$text[i].innerText = this.$textArray[i].substring(0, j+1);
                
            }, j * (this.$time - this.$delay) / wdth);
        }
    }

    changeImages(i) {
        this.$slides[i].classList.add('active');
        this.$slides[i].style.transitionDuration = this.$time / 1000 + 's';
    }

    changeTextWidth(i) {
        if (i > 0) {
            this.$text[i - 1].style.display = 'none';
            this.$text[i - 1].classList.remove('for-smoothly');
        }
        this.$text[i].classList.add('for-smoothly');
        this.$text[i].getElementsByClassName('clone-text')[0].style.transitionDuration = (this.$time - this.$delay) / 1000 + 's';
    }

    cloneTextSpan() {
        for (let i = 0; i < this.$text.length; i++) {
            let cloneSpan = document.createElement('span');
            cloneSpan.classList.add('clone-text');
            cloneSpan.innerHTML = this.$text[i].innerText.split(' ').join('&nbsp;');
            this.$text[i].appendChild(cloneSpan);
        }
    }
}