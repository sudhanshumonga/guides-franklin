import { migrateTree } from "../utils.js";
const treeData = [{"displayName":"Introduction","url":"contents/systemoverview50/r-introduction"},{"url":"","children":[{"displayName":"Radio","url":"contents/systemoverview50/radio/r-radiointro"},{"displayName":"Antenna Interface","url":"contents/systemoverview50/radio/antenna-if-2g4"},{"displayName":"Wake on Radio","url":"contents/systemoverview50/radio/wakeonradio"},{"displayName":"RFSENSE","url":"contents/systemoverview50/radio/rfsense"},{"displayName":"Packet and State Trace","url":"contents/systemoverview50/radio/packetstatetrace"},{"displayName":"Random Number Generator","url":"contents/systemoverview50/radio/truerng"}]},{"url":"","children":[{"displayName":"Power","url":"contents/systemoverview50/power/r-powerintro"},{"displayName":"Energy Management Unit (EMU)","url":"contents/systemoverview50/power/emu"},{"displayName":"DC-DC Converter","url":"contents/systemoverview50/power/dcdc"}]},{"displayName":"General Purpose Input/Output (GPIO)","url":"contents/systemoverview50/io-interface/gpio"},{"url":"","children":[{"displayName":"Clocking","url":"contents/systemoverview50/clocking/r-clockingintro"},{"displayName":"Clock Management Unit (CMU)","url":"contents/systemoverview50/clocking/cmu"},{"displayName":"Internal Oscillators","url":"contents/systemoverview50/clocking/oscillators"}]},{"url":"","children":[{"displayName":"Counters/Timers and PWM","url":"contents/systemoverview50/timers/r-timers-intro"},{"displayName":"Timer/Counter (TIMER)","url":"contents/systemoverview50/timers/timer"},{"displayName":"Real Time Counter and Calendar (RTCC)","url":"contents/systemoverview50/timers/rtcc"},{"displayName":"Low Energy Timer (LETIMER)","url":"contents/systemoverview50/timers/letimer"},{"displayName":"Ultra Low Power Wake-up Timer (CRYOTIMER)","url":"contents/systemoverview50/timers/cryotimer"},{"displayName":"Pulse Counter (PCNT)","url":"contents/systemoverview50/timers/pcnt"},{"displayName":"Watchdog Timer (WDOG)","url":"contents/systemoverview50/timers/wdog"}]},{"url":"","children":[{"displayName":"Communications and Other Digital Peripherals","url":"contents/systemoverview50/communications-other/r-comms-and-otherintro"},{"displayName":"Universal Synchronous/Asynchronous Receiver/Transmitter\n        (USART)","url":"contents/systemoverview50/communications-other/usart"},{"displayName":"Low Energy Universal Asynchronous Receiver/Transmitter\n        (LEUART)","url":"contents/systemoverview50/communications-other/leuart"},{"displayName":"Inter-Integrated Circuit Interface (I2C)","url":"contents/systemoverview50/communications-other/i2c"},{"displayName":"Peripheral Reflex System (PRS)","url":"contents/systemoverview50/communications-other/prs"}]},{"url":"","children":[{"displayName":"Security Features","url":"contents/systemoverview50/security/r-securityintro"},{"displayName":"GPCRC (General Purpose Cyclic Redundancy Check)","url":"contents/systemoverview50/security/gpcrc"},{"displayName":"Crypto Accelerator (CRYPTO)","url":"contents/systemoverview50/security/crypto"}]},{"url":"","children":[{"displayName":"Analog","url":"contents/systemoverview50/analog/r-analogintro"},{"displayName":"Analog Port (APORT)","url":"contents/systemoverview50/analog/aport"},{"displayName":"Analog Comparator (ACMP)","url":"contents/systemoverview50/analog/acmp"},{"displayName":"Analog to Digital Converter (ADC)","url":"contents/systemoverview50/analog/adc"},{"displayName":"Digital to Analog Current Converter (IDAC)","url":"contents/systemoverview50/analog/idac"}]},{"displayName":"Reset Management Unit (RMU)","url":"contents/systemoverview50/reset/rmu"},{"url":"","children":[{"displayName":"Core and Memory","url":"contents/systemoverview50/core-and-memory/r-core-memoryintro"},{"displayName":"Processor Core","url":"contents/systemoverview50/core-and-memory/core-m4"},{"displayName":"Memory System Controller (MSC)","url":"contents/systemoverview50/core-and-memory/msc"},{"displayName":"Linked Direct Memory Access Controller (LDMA)","url":"contents/systemoverview50/core-and-memory/ldma"}]},{"displayName":"Memory Map","url":"contents/systemoverview50/r-memorymap"},{"displayName":"Configuration Summary","url":"contents/systemoverview50/r-configuration-summary"},{"url":"","children":[{"displayName":"Electrical Characteristics","url":"contents/systemoverview50/elchara/r-electricalcharacteristics"},{"displayName":"Absolute Maximum Ratings","url":"contents/systemoverview50/elchara/r-absolutemaximumratings"},{"displayName":"General Operating Conditions","url":"contents/systemoverview50/elchara/general"},{"displayName":"Wake up times","url":"contents/systemoverview50/elchara/wakeup"},{"url":"","children":[{"displayName":"Brown Out Detector","url":"contents/systemoverview50/elchara/bod"},{"displayName":"Frequency Synthesizer Characteristics","url":"contents/systemoverview50/elchara/synth"}]},{"url":"","children":[{"displayName":"GPIO","url":"contents/systemoverview50/elchara/gpio"},{"displayName":"Flash Memory Characteristics","url":"contents/systemoverview50/elchara/flash"}]}]},{"displayName":"Introduction","url":"contents/systemoverview100/r-introduction-100"},{"url":"","children":[{"displayName":"Radio","url":"contents/systemoverview100/radio/r-radiointro-100"},{"displayName":"Antenna Interface","url":"contents/systemoverview100/radio/antenna-if-2g4-100"},{"displayName":"Wake on Radio","url":"contents/systemoverview100/radio/wakeonradio-100"},{"displayName":"RFSENSE","url":"contents/systemoverview100/radio/rfsense-100"},{"displayName":"Packet and State Trace","url":"contents/systemoverview100/radio/packetstatetrace-100"},{"displayName":"Random Number Generator","url":"contents/systemoverview100/radio/truerng-100"}]},{"url":"","children":[{"displayName":"Power","url":"contents/systemoverview100/power/r-powerintro-100"},{"displayName":"Energy Management Unit (EMU)","url":"contents/systemoverview100/power/emu-100"},{"displayName":"DC-DC Converter","url":"contents/systemoverview100/power/dcdc-100"}]},{"displayName":"General Purpose Input/Output (GPIO)","url":"contents/systemoverview100/io-interface/gpio-100"},{"url":"","children":[{"displayName":"Clocking","url":"contents/systemoverview100/clocking/r-clockingintro-100"},{"displayName":"Clock Management Unit (CMU)","url":"contents/systemoverview100/clocking/cmu-100"},{"displayName":"Internal Oscillators","url":"contents/systemoverview100/clocking/oscillators-100"}]},{"url":"","children":[{"displayName":"Counters/Timers and PWM","url":"contents/systemoverview100/timers/r-timers-intro-100"},{"displayName":"Timer/Counter (TIMER)","url":"contents/systemoverview100/timers/timer-100"},{"displayName":"Real Time Counter and Calendar (RTCC)","url":"contents/systemoverview100/timers/rtcc-100"},{"displayName":"Low Energy Timer (LETIMER)","url":"contents/systemoverview100/timers/letimer-100"},{"displayName":"Ultra Low Power Wake-up Timer (CRYOTIMER)","url":"contents/systemoverview100/timers/cryotimer-100"},{"displayName":"Pulse Counter (PCNT)","url":"contents/systemoverview100/timers/pcnt-100"},{"displayName":"Watchdog Timer (WDOG)","url":"contents/systemoverview100/timers/wdog-100"}]},{"url":"","children":[{"displayName":"Communications and Other Digital Peripherals","url":"contents/systemoverview100/communications-other/r-comms-and-otherintro-100"},{"displayName":"Universal Synchronous/Asynchronous Receiver/Transmitter\n        (USART)","url":"contents/systemoverview100/communications-other/usart-100"},{"displayName":"Low Energy Universal Asynchronous Receiver/Transmitter\n        (LEUART)","url":"contents/systemoverview100/communications-other/leuart-100"},{"displayName":"Inter-Integrated Circuit Interface (I2C)","url":"contents/systemoverview100/communications-other/i2c-100"},{"displayName":"Peripheral Reflex System (PRS)","url":"contents/systemoverview100/communications-other/prs-100"}]},{"url":"","children":[{"displayName":"Security Features","url":"contents/systemoverview100/security/r-securityintro-100"},{"displayName":"GPCRC (General Purpose Cyclic Redundancy Check)","url":"contents/systemoverview100/security/gpcrc-100"},{"displayName":"Crypto Accelerator (CRYPTO)","url":"contents/systemoverview100/security/crypto-100"}]},{"url":"","children":[{"displayName":"Analog","url":"contents/systemoverview100/analog/r-analogintro-100"},{"displayName":"Analog Port (APORT)","url":"contents/systemoverview100/analog/aport-100"},{"displayName":"Analog Comparator (ACMP)","url":"contents/systemoverview100/analog/acmp-100"},{"displayName":"Analog to Digital Converter (ADC)","url":"contents/systemoverview100/analog/adc-100"},{"displayName":"Digital to Analog Current Converter (IDAC)","url":"contents/systemoverview100/analog/idac-100"}]},{"displayName":"Reset Management Unit (RMU)","url":"contents/systemoverview100/reset/rmu-100"},{"url":"","children":[{"displayName":"Core and Memory","url":"contents/systemoverview100/core-and-memory/r-core-memoryintro-100"},{"displayName":"Processor Core","url":"contents/systemoverview100/core-and-memory/core-m4-100"},{"displayName":"Memory System Controller (MSC)","url":"contents/systemoverview100/core-and-memory/msc-100"},{"displayName":"Linked Direct Memory Access Controller (LDMA)","url":"contents/systemoverview100/core-and-memory/ldma-100"}]},{"displayName":"Memory Map","url":"contents/systemoverview100/r-memorymap-100"},{"displayName":"Configuration Summary","url":"contents/systemoverview100/r-configuration-summary-100"},{"url":"","children":[{"displayName":"Electrical Characteristics","url":"contents/systemoverview100/elchara/r-electricalcharacteristics-100"},{"displayName":"Absolute Maximum Ratings","url":"contents/systemoverview100/elchara/r-absolutemaximumratings-100"},{"displayName":"General Operating Conditions","url":"contents/systemoverview100/elchara/general-100"},{"displayName":"Wake up times","url":"contents/systemoverview100/elchara/wakeup-100"},{"url":"","children":[{"displayName":"Brown Out Detector","url":"contents/systemoverview100/elchara/bod-100"},{"displayName":"Frequency Synthesizer Characteristics","url":"contents/systemoverview100/elchara/synth-100"}]},{"url":"","children":[{"displayName":"GPIO","url":"contents/systemoverview100/elchara/gpio-100"},{"displayName":"Flash Memory Characteristics","url":"contents/systemoverview100/elchara/flash-100"}]}]}]

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
  sidenavContainer.prepend(span)
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