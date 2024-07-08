/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/modules/elements/blocks/featured-posts/split-slider.js
/**
 * Split Slider
 *
 * @author Wyde
 * @version 1.0.0
 */



const {
  gsap
} = window;

/**
 * Slide class
 */
class Slide {
  constructor(el) {
    this.DOM = {
      el
    };
  }
  setCurrent() {
    this.DOM.el.classList.add('current-slide');
  }
  reset() {
    this.DOM.el.classList.remove('current-slide');
  }
}

/**
 * Column class
 */
class Column {
  constructor(el, options) {
    this.DOM = {
      el
    };
    // The slide settings.
    this.settings = {
      reverse: false,
      duration: 1.2,
      ease: 'Expo.easeInOut'
    };
    Object.assign(this.settings, options || {});
    this.slides = [];
    this.current = 0;
    this.init();
  }

  /**
   * Initialize slides in the column.
   */
  init() {
    this.DOM.el.querySelectorAll('.tripp-xt-slide').forEach(slide => {
      if (true === this.settings.reverse) {
        this.DOM.el.insertBefore(slide, this.DOM.el.firstChild);
      }
      this.slides.push(new Slide(slide));
    });
  }

  /**
   * Loads the slides.
   *
   * @param {number} index The active slide index.
   */
  load(index) {
    this.slideTo(index, false);
  }

  /**
   * Navigates to specific slide.
   *
   * @param {number}  index   The slide index to navigate to.
   * @param {boolean} animate Whether the slide should be animated.
   */
  slideTo(index, animate = true) {
    return new Promise(resolve => {
      this.slides[this.current].reset();
      let translate = index;
      if (this.settings.reverse) {
        translate = this.slides.length - 1 - index;
      }
      if (!animate) {
        gsap.set(this.DOM.el, {
          y: -(translate * 100) + '%',
          onComplete: () => {
            this.current = index;
            this.slides[index].setCurrent();
          }
        });
      } else {
        gsap.to(this.DOM.el, {
          y: -(translate * 100) + '%',
          duration: this.settings.duration,
          ease: this.settings.ease,
          onComplete: () => {
            this.current = index;
            this.slides[index].setCurrent();
            resolve();
          }
        });
      }
    });
  }
}

/**
 * The navigation class. Controls the slide animations (e.g. pagination animation).
 */
class Navigation {
  constructor(el, options) {
    if (!el) {
      return;
    }
    this.DOM = {
      el
    };
    this.settings = {
      total: 0,
      current: 0,
      navigation: true,
      pagination: true,
      slideTo: () => {
        return false;
      }
    };
    Object.assign(this.settings, options);
    if (this.settings.pagination === true) {
      this.settings.pagination = {
        numbers: true,
        bullets: true
      };
    }
    this.current = this.settings.current;
    this.buttons = [];
    this.init();
  }

  /**
   * Initializes the navigation.
   */
  init() {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('tripp-xt-page-buttons');
    this.DOM.el.appendChild(buttonWrapper);
    if (this.settings.navigation) {
      this.prevButton = document.createElement('span');
      this.prevButton.classList.add('tripp-xt-nav-button', 'tripp-xt-button-prev');
      this.prevButton.innerHTML = '<i class="tripp-ico-arrow-up"></i>';
      this.prevButton.addEventListener('click', e => {
        e.preventDefault();
        const index = this.current - 1;
        if (index < 0) {
          return;
        }
        this.slideTo(index);
      });
      buttonWrapper.appendChild(this.prevButton);
    }
    if (this.settings.pagination) {
      if (this.settings.pagination.numbers) {
        this.currentPage = document.createElement('span');
        this.currentPage.classList.add('tripp-xt-first-page');
        this.currentPage.innerHTML = ('0' + (this.current + 1)).slice(-2);
        buttonWrapper.appendChild(this.currentPage);
      }
      if (this.settings.pagination.bullets) {
        for (let i = 0; i < this.settings.total; i++) {
          const button = document.createElement('span');
          button.classList.add('tripp-xt-page-button');
          button.addEventListener('click', e => {
            e.preventDefault();
            this.slideTo(i);
            return false;
          });
          this.buttons.push(button);
          buttonWrapper.appendChild(button);
        }
      }
      if (this.settings.pagination.numbers) {
        this.totalPage = document.createElement('span');
        this.totalPage.classList.add('tripp-xt-last-page');
        this.totalPage.innerHTML = ('0' + this.settings.total).slice(-2);
        buttonWrapper.appendChild(this.totalPage);
      }
    }
    if (this.settings.navigation) {
      this.nextButton = document.createElement('span');
      this.nextButton.classList.add('tripp-xt-nav-button', 'tripp-xt-button-next');
      this.nextButton.innerHTML = '<i class="tripp-ico-arrow-down"></i>';
      this.nextButton.addEventListener('click', e => {
        e.preventDefault();
        const index = this.current + 1;
        if (index > this.settings.total - 1) {
          return;
        }
        this.slideTo(index < this.settings.total ? index : 0);
      });
      buttonWrapper.appendChild(this.nextButton);
    }
  }

  /**
   * Sets the current slide to show.
   *
   * @param {number} current The current slide index.
   */
  setCurrent(current) {
    this.current = current;
    if (this.buttons && this.buttons.length > 0) {
      this.buttons.forEach((button, index) => {
        if (index === this.current) {
          button.classList.add('current');
        } else {
          button.classList.remove('current');
        }
      });
    }
    if (this.currentPage) {
      this.currentPage.innerText = ('0' + (this.current + 1)).slice(-2);
    }
    if (this.prevButton) {
      this.prevButton.classList.toggle('tripp-xt-button-disabled', this.current === 0);
    }
    if (this.nextButton) {
      this.nextButton.classList.toggle('tripp-xt-button-disabled', this.current === this.settings.total - 1);
    }
  }

  /**
   * Slides to target index.
   *
   * @param {number} index Slide index.
   */
  slideTo(index) {
    if (typeof this.settings.slideTo === 'function') {
      this.settings.slideTo(index);
    }
  }
}

/**
 * Split Slider class.
 */
class SplitSlider {
  constructor(el, options) {
    if (!el) {
      return;
    }
    if (el.classList.contains('is-split-slider-initialized')) {
      return;
    }
    el.classList.add('is-split-slider-initialized');
    this.DOM = {
      el
    };
    this.DOM.wrapper = this.DOM.el.querySelector('.tripp-xt-slides');
    this.settings = {
      start: 0,
      loop: false,
      mousewheel: true,
      keyboard: true,
      touch: true,
      duration: 0.3,
      ease: 'Expo.easeInOut',
      navigation: true,
      pagination: true,
      onInit: () => {},
      onChange: () => {},
      onBeforeChange: () => {}
    };
    Object.assign(this.settings, options || {});
    this.columns = [];
    this.DOM.el.querySelectorAll('.tripp-xt-column').forEach(col => {
      this.columns.push(new Column(col, {
        reverse: col.dataset.reverse ? true : false
      }));
    });
    this.slidesTotal = this.columns[0].slides.length;

    // Initialize the navigation instance. When clicking the next or prev ctrl buttons, trigger the navigate function.
    this.navigation = new Navigation(this.DOM.el.querySelector('.slider-pagination'), Object.assign({}, this.settings, {
      slideTo: index => this.slideTo(index),
      total: this.slidesTotal
    }));

    // Current slide position.
    this.current = 0;
    // Initialize the slideshow.
    this.init();
    this.load();
  }

  /**
   * Returns whether an element is within the viewport.
   *
   * @param {Element} element Target element.
   * @return {boolean} Whether the element is within the viewport.
   */
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return !(rect.bottom < 0 || rect.top - window.innerHeight >= 0);
  }

  /**
   * Initializes the slider.
   */
  init() {
    this.initMouseWheel();
    this.initKeyboard();
    this.initTouch();
    if (typeof this.settings.onInit === 'function') {
      this.settings.onInit(this);
    }
  }
  initMouseWheel() {
    if (this.settings.mousewheel === true) {
      // Play slides using mouse scroll.
      this.DOM.el.addEventListener('wheel', e => {
        let playSlide = true;
        if (e.deltaY > 0) {
          playSlide = this.navigate('next');
        } else {
          playSlide = this.navigate('prev');
        }
        if (true === playSlide) {
          e.preventDefault();
          return false;
        }
      });
    }
  }
  initKeyboard() {
    if (this.settings.keyboard === true) {
      // Play slides using keyboard.
      const keys = ['ArrowUp', 'ArrowDown', 'ArrowArrowLeft', 'ArrowRight'];
      window.addEventListener('keydown', e => {
        if (-1 !== keys.indexOf(e.key)) {
          if (!this.isInViewport(this.DOM.wrapper)) {
            return;
          }
          let playSlide = true;
          if ('ArrowDown' === e.key) {
            playSlide = this.navigate('next');
          } else if ('ArrowUp' === e.key) {
            playSlide = this.navigate('prev');
          }
          if (window.scrollY > 10) {
            return true;
          }
          if (true === playSlide) {
            e.preventDefault();
            return false;
          }
        }
      }, false);
    }
  }
  initTouch() {
    if (this.settings.touch) {
      let xDown = null;
      let yDown = null;
      const getTouches = event => {
        return event.touches || event.originalEvent.touches;
      };
      const handleTouchStart = event => {
        const firstTouch = getTouches(event)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
      };
      const handleTouchMove = event => {
        if (!xDown || !yDown) {
          return;
        }
        const xUp = event.touches[0].clientX;
        const yUp = event.touches[0].clientY;
        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;
        let playSlide = true;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          /*most significant*/
          if (xDiff > 0) {
            /* left swipe */
          } else {
            /* right swipe */
          }
        } else if (yDiff > 0) {
          playSlide = this.navigate('next');
        } else {
          playSlide = this.navigate('prev');
        }
        /* reset values */
        xDown = null;
        yDown = null;
        if (true === playSlide) {
          return false;
        }
      };
      document.addEventListener('touchstart', handleTouchStart, false);
      document.addEventListener('touchmove', handleTouchMove, false);
    }
  }

  /**
   * Loads the slider.
   */
  load() {
    if (this.columns.length > 0 && this.slidesTotal > 0) {
      this.columns.forEach(column => {
        column.load(this.settings.start);
      });
      this.navigation.setCurrent(this.settings.start);
      this.slideChange(this.settings.start);
      if (this.settings.start !== this.current) {
        this.slideTo(this.current);
      }
    }
    this.DOM.el.classList.add('is-loaded');
  }

  /**
   * Navigates to the given direction.
   *
   * @param {string} direction The slide direction between next and previous.
   */
  navigate(direction) {
    let nextSlideIndex;
    if ('next' === direction) {
      nextSlideIndex = this.current + 1;
      if (nextSlideIndex > this.slidesTotal - 1) {
        if (this.settings.loop !== true) {
          return false;
        }
        nextSlideIndex = 0;
      }
    } else {
      nextSlideIndex = this.current - 1;
      if (nextSlideIndex < 0) {
        if (this.settings.loop !== true) {
          return false;
        }
        nextSlideIndex = this.slidesTotal - 1;
      }
    }
    this.slideTo(nextSlideIndex);
    return true;
  }

  /**
   * Slides to the specific slide.
   *
   * @param {number} index The slide index to navigate to.
   */
  slideTo(index) {
    // If animating return.
    if (this.isAnimating) {
      return false;
    }
    this.isAnimating = true;
    if (typeof this.settings.onBeforeChange === 'function') {
      const slides = [];
      this.columns.forEach(column => {
        slides.push(column.slides[index]);
      });
      this.settings.onBeforeChange(this, slides);
    }
    if (index > this.current) {
      this.DOM.el.classList.remove('slide-to-prev');
      this.DOM.el.classList.add('slide-to-next');
    } else {
      this.DOM.el.classList.remove('slide-to-next');
      this.DOM.el.classList.add('slide-to-prev');
    }
    Promise.all([this.columns[0].slideTo(index), this.columns[1].slideTo(index, true)]).then(() => {
      this.current = index;
      this.slideChange(index);
      this.isAnimating = false;
    });
    this.navigation.setCurrent(index);
  }
  slideChange(index) {
    if (this.slidesTotal < 1) {
      return;
    }
    if (typeof this.settings.onChange === 'function') {
      const slides = [];
      this.columns.forEach(column => {
        slides.push(column.slides[index]);
      });
      this.settings.onChange(this, slides);
    }
    this.columns.forEach(column => {
      const slide = column.slides[index];
      if (slide && slide.DOM.el.classList.contains('has-scheme-light')) {
        this.navigation.DOM.el.classList.remove('has-scheme-dark');
        this.navigation.DOM.el.classList.add('has-scheme-light');
      } else if (slide.DOM.el.classList.contains('has-scheme-dark')) {
        this.navigation.DOM.el.classList.remove('has-scheme-light');
        this.navigation.DOM.el.classList.add('has-scheme-dark');
      } else {
        this.navigation.DOM.el.classList.remove('has-scheme-light', 'has-scheme-dark');
      }
    });
  }
}
/* harmony default export */ const split_slider = (SplitSlider);
;// CONCATENATED MODULE: ./src/modules/elements/blocks/featured-posts/index.js

const {
  imagesLoaded,
  flextension,
  gsap: featured_posts_gsap
} = window;
let isResizeEventAdded = false;

/**
 * Initializes the Featured Slider.
 *
 * @param {Element} content The content element.
 */
function initFeaturedSliders(content) {
  const disableScrolling = content.querySelector('.tripp-xt-block-featured-posts.tripp-xt-disable-scrolling');
  if (disableScrolling !== null) {
    setTimeout(() => {
      document.documentElement.classList.add('no-scroll');
      document.body.classList.add('no-scroll');
    }, 500);
  } else {
    setTimeout(() => {
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    }, 500);
  }
  const initFullHeight = () => {
    content.querySelectorAll('.tripp-xt-fullscreen').forEach(el => {
      el.style.setProperty('--tripp-xt-full-height', `${window.innerHeight}px`);
    });
  };
  if (true !== isResizeEventAdded) {
    window.addEventListener('resize', flextension.debounce(() => {
      initFullHeight();
    }, 300));
    isResizeEventAdded = true;
  }
  initFullHeight();
  content.querySelectorAll('.tripp-xt-carousel').forEach(el => {
    new flextension.carousel(el, {
      mousewheel: el.classList.contains('has-mousewheel'),
      breakpoints: {
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2
        },
        1400: {
          slidesPerView: 3,
          slidesPerGroup: 3
        }
      },
      on: {
        slideChange: carousel => {
          setTimeout(() => {
            carousel.params.mousewheel.releaseOnEdges = false;
          }, 300);
        },
        reachBeginning: carousel => {
          setTimeout(() => {
            carousel.params.mousewheel.releaseOnEdges = true;
          }, 1000);
        },
        reachEnd: carousel => {
          setTimeout(() => {
            carousel.params.mousewheel.releaseOnEdges = true;
          }, 1000);
        }
      }
    });
  });
  content.querySelectorAll('.tripp-xt-vertical-slider').forEach(el => {
    imagesLoaded(el.querySelectorAll('img'), () => {
      new split_slider(el, {
        mousewheel: el.classList.contains('has-mousewheel'),
        navigation: el.dataset.navigation ? true : false,
        pagination: el.dataset.pagination ? {
          bullets: true,
          numbers: false
        } : false,
        onInit: slider => {
          const background = slider.DOM.el.querySelector('.slider-background');
          if (background === null) {
            return;
          }
          const slideText = background.querySelector('.slider-background-text');

          // Animate the background when the mouse moves.
          slider.DOM.el.addEventListener('mousemove', e => {
            const winWidth = window.innerWidth,
              elWidth = slider.DOM.el.offsetWidth;
            const x = (winWidth - elWidth) / 2 - (e.pageX - winWidth / 2) / 2;
            featured_posts_gsap.to(background, {
              x,
              duration: 0.3
            });
            if (slideText !== null) {
              if (e.pageX < slider.DOM.el.offsetWidth / 2) {
                slideText.classList.add('slide-text-reverse');
              } else {
                slideText.classList.remove('slide-text-reverse');
              }
            }
          });
        },
        onBeforeChange: slider => {
          const background = slider.DOM.el.querySelector('.slider-background');
          if (background !== null) {
            background.classList.remove('tripp-xt-fade-in');
          }
        },
        onChange: (slider, slides) => {
          const background = slider.DOM.el.querySelector('.slider-background');
          if (background === null) {
            return;
          }
          const backgroundText = background.querySelector('span');
          if (backgroundText !== null) {
            slides.forEach(slide => {
              const title = slide.DOM.el.querySelector('.slide-title');
              if (title) {
                const text = title.textContent.replace(/(\r\n|\n|\r)/gm, '') + ' ';
                backgroundText.innerText = text;
                if (backgroundText.offsetWidth < window.innerWidth * 4) {
                  backgroundText.innerText = text.repeat(Math.round(window.innerWidth * 4 / backgroundText.offsetWidth));
                }
              }
            });
          }
          background.classList.add('tripp-xt-fade-in');
        }
      });
    });
  });
}
flextension.on('ready', (context, content) => {
  if (!content) {
    initFeaturedSliders(document);
  } else {
    setTimeout(() => {
      initFeaturedSliders(content);
    }, 1200);
  }
});
;// CONCATENATED MODULE: ./src/modules/elements/js/index.js
/**
 * Internal dependencies
 */

/******/ })()
;