import { migrateTree } from "../utils.js";
const treeData = [{"displayName":"Introduction","url":"contents/r-introduction-150"},{"url":"","children":[{"displayName":"Radio","url":"contents/radio/r-radiointro-150"},{"displayName":"Antenna Interface","url":"contents/radio/antenna-if-2g4-150"},{"displayName":"Wake on Radio","url":"contents/radio/wakeonradio-150"},{"displayName":"RFSENSE","url":"contents/radio/rfsense-150"},{"displayName":"Packet and State Trace","url":"contents/radio/packetstatetrace-150"},{"displayName":"Random Number Generator","url":"contents/radio/truerng-150"}]},{"url":"","children":[{"displayName":"Power","url":"contents/power/r-powerintro-150"},{"displayName":"Energy Management Unit (EMU)","url":"contents/power/emu-150"},{"displayName":"DC-DC Converter","url":"contents/power/dcdc-150"}]},{"displayName":"General Purpose Input/Output (GPIO)","url":"contents/io-interface/gpio-150"},{"url":"","children":[{"displayName":"Clocking","url":"contents/clocking/r-clockingintro-150"},{"displayName":"Clock Management Unit (CMU)","url":"contents/clocking/cmu-150"},{"displayName":"Internal Oscillators","url":"contents/clocking/oscillators-150"}]},{"url":"","children":[{"displayName":"Counters/Timers and PWM","url":"contents/timers/r-timers-intro-150"},{"displayName":"Timer/Counter (TIMER)","url":"contents/timers/timer-150"},{"displayName":"Real Time Counter and Calendar (RTCC)","url":"contents/timers/rtcc-150"},{"displayName":"Low Energy Timer (LETIMER)","url":"contents/timers/letimer-150"},{"displayName":"Ultra Low Power Wake-up Timer (CRYOTIMER)","url":"contents/timers/cryotimer-150"},{"displayName":"Pulse Counter (PCNT)","url":"contents/timers/pcnt-150"},{"displayName":"Watchdog Timer (WDOG)","url":"contents/timers/wdog-150"}]},{"url":"","children":[{"displayName":"Communications and Other Digital Peripherals","url":"contents/communications-other/r-comms-and-otherintro-150"},{"displayName":"Universal Synchronous/Asynchronous Receiver/Transmitter\n        (USART)","url":"contents/communications-other/usart-150"},{"displayName":"Low Energy Universal Asynchronous Receiver/Transmitter\n        (LEUART)","url":"contents/communications-other/leuart-150"},{"displayName":"Inter-Integrated Circuit Interface (I2C)","url":"contents/communications-other/i2c-150"},{"displayName":"Peripheral Reflex System (PRS)","url":"contents/communications-other/prs-150"}]},{"url":"","children":[{"displayName":"Security Features","url":"contents/security/r-securityintro-150"},{"displayName":"GPCRC (General Purpose Cyclic Redundancy Check)","url":"contents/security/gpcrc-150"},{"displayName":"Crypto Accelerator (CRYPTO)","url":"contents/security/crypto-150"}]},{"url":"","children":[{"displayName":"Analog","url":"contents/analog/r-analogintro-150"},{"displayName":"Analog Port (APORT)","url":"contents/analog/aport-150"},{"displayName":"Analog to Digital Converter (ADC)","url":"contents/analog/adc-150"},{"displayName":"Digital to Analog Current Converter (IDAC)","url":"contents/analog/idac-150"}]},{"displayName":"Reset Management Unit (RMU)","url":"contents/reset/rmu-150"},{"url":"","children":[{"displayName":"Core and Memory","url":"contents/core-and-memory/r-core-memoryintro-150"},{"displayName":"Processor Core","url":"contents/core-and-memory/core-m4-150"},{"displayName":"Memory System Controller (MSC)","url":"contents/core-and-memory/msc-150"},{"displayName":"Linked Direct Memory Access Controller (LDMA)","url":"contents/core-and-memory/ldma-150"}]},{"displayName":"Memory Map","url":"contents/r-memorymap-150"},{"displayName":"Configuration Summary","url":"contents/r-configuration-summary-150"},{"url":"","children":[{"displayName":"Electrical Characteristics","url":"contents/elchara/r-electricalcharacteristics-150"},{"displayName":"Absolute Maximum Ratings","url":"contents/elchara/r-absolutemaximumratings-150"},{"displayName":"General Operating Conditions","url":"contents/elchara/general-150"},{"displayName":"Wake up times","url":"contents/elchara/wakeup-150"},{"url":"","children":[{"displayName":"Brown Out Detector","url":"contents/elchara/bod-150"},{"displayName":"Frequency Synthesizer Characteristics","url":"contents/elchara/synth-150"}]},{"url":"","children":[{"displayName":"GPIO","url":"contents/elchara/gpio-150"},{"displayName":"Flash Memory Characteristics","url":"contents/elchara/flash-150"}]}]}]
const mapTitle = "System Overview"
const isDesktop = window.matchMedia("(min-width: 900px)");

function expandHeirarchy(element, root) {
  if (element === root) return;
  let parent = element.parentElement;
  parent.classList.remove("closed");
  expandHeirarchy(parent, root);
}

function expandSelection(parent) {
  let queryString = window.location.search;
  let params = new URLSearchParams(queryString);
  let id = params.get("expand");
  let element = document.getElementById(`sidenav-li-${id}`);
  if (!element) return;
  element.classList.add("selected");
  expandHeirarchy(element, parent);
  element.scrollIntoView();
}

function addResizeBar() {
  const sidenavContainer = document.getElementsByClassName("sidenav-container")[0];
  const div = document.createElement("div");
  div.classList.add('sidenav-resize-bar');
  let isResizing = false
  div.addEventListener('mousedown', (evt) => {
    isResizing = true
    document.addEventListener('mousemove', function (event) {
      if (isResizing) {
        let newWidth = event.pageX - sidenavContainer.offsetLeft;
        sidenavContainer.style.width = `${newWidth}px`;
      }
    })
  })
  document.addEventListener('mouseup', function () {
    if (isResizing) {
      isResizing = false;
    }
  })
  sidenavContainer.insertAdjacentElement("afterend", div)
}

function addExpandCollapseButton() {
  const divWrapper = document.createElement("div");
  divWrapper.classList.add('title-close-wrapper')
  const titleSpan = document.createElement("span");
  titleSpan.classList.add('title-span')
  titleSpan.textContent = mapTitle
  const span = document.createElement("span");
  span.classList.add('sidenav-expand-collapse')
  span.classList.add('open')
  const sidenavContainer = document.getElementsByClassName("sidenav-container")[0];
  span.addEventListener('click', () => {
    const isOpen = span.classList.contains('open')
    const sidenavResizer = document.getElementsByClassName("sidenav-resize-bar")[0];
    if(!isOpen) {
      sidenavContainer.classList.remove('collapse-width')
      sidenavResizer.classList.remove('force-hide')
    } else {
      sidenavContainer.classList.add('collapse-width')
      sidenavResizer.classList.add('force-hide')
    }
    span.classList.toggle("open");
  })
  divWrapper.append(titleSpan)
  divWrapper.append(span)
  sidenavContainer.prepend(divWrapper)
}

function generateId(prefix, suffix) {
  if(prefix) {
      return `${prefix}-${suffix}`
  }
  return `${suffix}`
}

function createTree(parent, data, prefix, level) {
  const ul = document.createElement("ul");
  ul.classList.add("tree");
  parent.appendChild(ul);
  data.forEach((item, idx) => {
    const li = document.createElement("li");
    const newPrefix = generateId(prefix, level)
    const _id = generateId(newPrefix, idx);
    li.setAttribute("id", `sidenav-li-${_id}`);
    ul.appendChild(li);
    const anchor = document.createElement("a");
    const span = document.createElement("span");
    span.classList.add("chevron-icon-span");
    anchor.textContent = item.displayName;
    anchor.setAttribute("data-li-id", _id);
    anchor.setAttribute("title", item.displayName);
    anchor.setAttribute("aria-label", item.displayName);
    const siteURL =
      window.location.protocol +
      "//" +
      window.location.hostname +
      (window.location.port ? ":" + window.location.port : "");
    if (item.url) {
      let navURL = new URL(item.url, siteURL).href;
      anchor.setAttribute("href", navURL);
      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        onClick(anchor.getAttribute("data-li-id"), navURL);
      });
    }
    li.classList.add("sidenav-list-item");
    li.classList.add("closed");
    if (item.children) {
      li.classList.add("has-children");
      const wrapperSpan = document.createElement("span");
      wrapperSpan.classList.add("chevron-text-wrapper");
      wrapperSpan.appendChild(span);
      wrapperSpan.appendChild(anchor);
      li.appendChild(wrapperSpan);
      createTree(li, item.children, newPrefix, idx);
    } else {
      li.appendChild(anchor);
    }
  });
}

function onClick(id, navURL) {
  const url = new URL(navURL);
  url.searchParams.set("expand", id); // set the query parameter
  window.location.href = url.toString(); // navigate
}

// Get the treeview element and create the tree
const treeview = document.getElementsByClassName("sidenav")[0];
addExpandCollapseButton();
createTree(treeview, treeData, '', '');
migrateTree(isDesktop);
addResizeBar(treeview);
isDesktop.addEventListener("change", () => migrateTree(isDesktop));
expandSelection(treeview);

// Add click event listener to each span element
treeview.querySelectorAll("span").forEach((span) => {
  span.addEventListener("click", (event) => {
    // Toggle the "closed" class on the parent li element
    event.currentTarget.parentNode.classList.toggle("closed");
  });
});