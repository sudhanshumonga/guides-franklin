// eslint-disable-next-line import/no-cycle
const contentSection = document.querySelector('.section.breadcrumbs-container')
const body = document.querySelector('body')

function hasVerticalScrollbar(element) {
  return element.scrollHeight > element.clientHeight;
}

function fireAppReadyEvent() {
    const customEvent = new Event('franklin-app-ready');
    window.dispatchEvent(customEvent)
}

function addReadyClass() {
    body.classList.add('franklin-app-rendered')
}

function handleScroll() {
    if ((contentSection.scrollTop + contentSection.clientHeight >= contentSection.scrollHeight)) {
      // body.classList.add('hide-content-scroll')
    }
    if(!hasVerticalScrollbar(contentSection)) {
      body.classList.add('hide-content-scroll')
      
    }
  }

import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');
fireAppReadyEvent();
addReadyClass();

contentSection.addEventListener('scroll', handleScroll);
contentSection.addEventListener('mouseenter', () => {
  if(hasVerticalScrollbar(contentSection)) {
    body.classList.remove('hide-content-scroll')
  }
})
contentSection.addEventListener('mouseleave', () => {
  if(hasVerticalScrollbar(contentSection)) {
    body.classList.add('hide-content-scroll')
  }
})
window.addEventListener('scroll', () => {
  if (window.scrollY === 0 && hasVerticalScrollbar(contentSection)) {
    // body.classList.remove('hide-content-scroll')
  }
});
// add more delayed functionality here
