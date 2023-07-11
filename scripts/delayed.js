// eslint-disable-next-line import/no-cycle

function fireAppReadyEvent() {
    const customEvent = new Event('franklin-app-ready');
    window.dispatchEvent(customEvent)
}

function addReadyClass() {
    const body = document.getElementsByName('body')[0]
    body.classList.add('franklin-app-rendered')
}

import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');
fireAppReadyEvent();
addReadyClass();
// add more delayed functionality here
