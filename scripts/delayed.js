// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');
const customEvent = new Event('franklin-website-ready');
window.dispatchEvent(customEvent)
// add more delayed functionality here
