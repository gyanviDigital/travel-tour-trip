/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/**
 * Mega Menu
 *
 * @author Wyde
 * @version 1.0.0
 */



const {
  flextension,
  trippApp
} = window;
class MegaMenu {
  constructor(menu) {
    if (!menu) {
      return;
    }
    if (menu.dataset.megaMenu) {
      return;
    }
    menu.dataset.megaMenu = true;
    this.menu = menu;
    this.menuItems = [];
    this.contentPanels = [];
    this.currentIndex = 0;
    this.init();
  }
  init() {
    if (this.menu.classList.contains('tripp-xt-mm-has-posts')) {
      this.contentPanels = this.menu.querySelectorAll('.tripp-xt-mm-content');
      if (this.contentPanels.length > 0) {
        const container = document.createElement('div');
        container.classList.add('sub-menu');
        this.menu.append(container);
        const wrapper = document.createElement('div');
        wrapper.classList.add('tripp-xt-mm-wrapper');
        container.append(wrapper);
        const subMenu = this.menu.querySelector('ul');
        if (subMenu !== null) {
          subMenu.classList.remove('sub-menu');
          subMenu.classList.add('tripp-xt-mm-categories');
          wrapper.append(subMenu);
        }
        const content = this.menu.querySelector('.tripp-xt-mm-posts');
        if (content !== null) {
          wrapper.append(content);
        }
        this.menu.addEventListener('mouseenter', () => {
          this.show();
        });
        this.menuItems = this.menu.querySelectorAll('.sub-menu .menu-item');
        this.menuItems.forEach((item, index) => {
          item.addEventListener('mouseenter', () => {
            this.currentIndex = index;
            this.show();
          });
        });
      }
    } else {
      const container = document.createElement('div');
      container.classList.add('sub-menu');
      this.menu.append(container);
      const subMenu = this.menu.querySelector('ul');
      if (subMenu !== null) {
        subMenu.classList.remove('sub-menu');
        subMenu.classList.add('tripp-xt-mm-wrapper');
        container.append(subMenu);
      }
    }
  }
  show() {
    this.hide();
    if (this.currentIndex < this.menuItems.length && this.menuItems[this.currentIndex]) {
      this.menuItems[this.currentIndex].classList.add('is-visible');
    }
    if (this.currentIndex < this.contentPanels.length && this.contentPanels[this.currentIndex]) {
      this.contentPanels[this.currentIndex].classList.add('content-active');
      if (!this.contentPanels[this.currentIndex].classList.contains('is-loaded')) {
        this.loadPosts(this.currentIndex);
      }
    }
  }
  hide() {
    this.menuItems.forEach((item, index) => {
      if (index !== this.currentIndex) {
        item.classList.remove('is-visible');
      }
    });
    this.contentPanels.forEach((panel, index) => {
      if (index !== this.currentIndex) {
        panel.classList.remove('content-active');
      }
    });
  }
  getColumnsPerRow(grid) {
    let columns = 4;
    const style = window.getComputedStyle(grid);
    if (style) {
      columns = parseInt(style.getPropertyValue('--tripp-xt-mega-menu-posts-columns'), 10);
    }
    return columns;
  }
  loadPosts(index) {
    if (this.contentPanels[index].classList.contains('is-loading')) {
      return;
    }
    this.contentPanels[index].classList.add('is-loading');
    const columns = this.getColumnsPerRow(this.contentPanels[index]);
    const itemTemplate = '<article class="entry mega-menu-item-placeholder"><div class="entry-media"></div><div class="entry-header"></div></article>';
    this.contentPanels[index].innerHTML = itemTemplate.repeat(columns);
    flextension.api.get('/tripp-xt/v1/mega-menu', {
      taxonomy: this.contentPanels[index].dataset.taxonomy || 'category',
      term: this.contentPanels[index].dataset.term || 0,
      columns
    }).then(data => {
      this.displayPosts(index, data.rendered);
      this.contentPanels[index].classList.remove('is-loading');
    });
  }
  displayPosts(index, posts) {
    if (index < this.contentPanels.length) {
      this.contentPanels[index].innerHTML = posts;
      this.contentPanels[index].classList.add('is-loaded');
      trippApp.emit('megaMenu.afterDisplayPosts', this.contentPanels[index]);
      setTimeout(() => {
        if (flextension) {
          flextension.emit('ready', this.contentPanels[index]);
        }
        trippApp.emit('ready', this.contentPanels[index]);
      }, 500);
    }
  }
}
trippApp.on('ready', (context, content) => {
  if (!content) {
    content = document;
  }
  content.querySelectorAll('.main-navigation .tripp-xt-mega-menu').forEach(menu => {
    new MegaMenu(menu);
  });
});
/******/ })()
;