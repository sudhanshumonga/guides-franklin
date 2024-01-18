// eslint-disable-next-line import/no-cycle
const contentSection = document.querySelector('.section.breadcrumbs-container')
const body = document.querySelector('body')

function changeScroller(isDesktop) {
    if(!isDesktop.matches || !hasVerticalScrollbar(contentSection)) { //mobile view
        body.classList.add('hide-content-scroll')
    } else {
        
    }
}

function scrollSidenavSelectionToView() {
  const element = document.querySelector('.sidenav-list-item.selected')
  const sidenavContainer = document.getElementsByClassName("sidenav-container")[0];
  if(!element) return
  if (element.offsetTop < sidenavContainer.scrollTop || element.offsetTop + element.offsetHeight > sidenavContainer.scrollTop + sidenavContainer.clientHeight) {
    sidenavContainer.scrollTo({
      top: Math.max(element.offsetTop - 110, 0),
      behavior: 'smooth'
    });
  }
}

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
const isDesktop = window.matchMedia('(min-width: 900px)');

// Core Web Vitals RUM collection
sampleRUM('cwv');
fireAppReadyEvent();
addReadyClass();

contentSection.addEventListener('scroll', handleScroll);
contentSection.addEventListener('mouseenter', () => {
  if(hasVerticalScrollbar(contentSection)) {
    body.classList.remove('hide-content-scroll')
  } else {
    body.classList.add('hide-content-scroll')
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
isDesktop.addEventListener("change", () => changeScroller(isDesktop));
changeScroller(isDesktop)
scrollSidenavSelectionToView()
// add more delayed functionality here
