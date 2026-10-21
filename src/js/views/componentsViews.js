class ComponentsView {
  // Slider Data
  _sliders = document.querySelectorAll(".slider__sliders");
  _sliderContainer = document.querySelector(".slider");
  _curentSlide = 0;
  constructor() {
    this._activateSlides();
    this._sliderContainer.addEventListener(
      "click",
      this._addHandlerGotoSlide.bind(this),
    );
  }

  _renderSlider(curSli) {
    if (this._curentSlide === this._sliders.length - 1) {
      this._curentSlide = 0;
    } else {
      this._curentSlide++;
    }
    this._sliders.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - curSli)}%)`;
    });
  }
  _addHandlerGotoSlide(e) {
    const btn = e.target.id;
    if (btn === "next") {
      if (this._curentSlide === this._sliders.length - 1) {
        this._curentSlide = 0;
      } else {
        this._curentSlide++;
      }
    }

    if (btn === "prev") {
      if (this._curentSlide === 0) this._curentSlide = this._sliders.length - 1;
      else {
        this._curentSlide--;
      }
    }
    this._renderSlider(this._curentSlide);
  }

  _activateSlides() {
    setInterval(() => {
      this._renderSlider(this._curentSlide);
    }, 5000);
  }
}

export default new ComponentsView();
