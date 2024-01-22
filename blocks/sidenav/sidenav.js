import { migrateTree } from "../utils.js";
const treeData = [{"displayName":"Notes (count: 5, multiple types)","url":"contents/topics/guid-7db7b518-48a1-4feb-8c3a-6300f9d1ab2e"},{"displayName":"Parml, parmname, pt, ph, plentry, pre, q","url":"contents/topics/guid-983f66dd-0456-4637-b78b-816ceff547a5"},{"displayName":"Task: Postreq, prereq, searchtitle, simpletable, sl, step-unordered, stepxmp, userinput","url":"contents/topics/guid-d5909da4-333d-47e8-b11b-7f2ccd2c6083"},{"displayName":"Prolog","url":"contents/topics/guid-011e02ff-f0cb-44c1-97fb-67dd99a30481"},{"displayName":"Reference: Properties Table","url":"contents/topics/guid-9b2d2e6a-6f86-4bf9-9f6d-7b494603a84c"},{"displayName":"References (without and with display text , count: 8)","url":"contents/topics/guid-ae2161f1-3ed5-4e3e-b354-05f5ef0274b7"},{"displayName":"Self references (last two elements)","url":"contents/topics/guid-5bc3c00d-3698-4af7-8b9e-97eebe33c16f"},{"displayName":"Key references from keysMap.ditamap","url":"contents/topics/guid-2ca216db-b77f-488c-ab3f-213eca65e079"},{"displayName":"Keywords from keyMap","url":"contents/topics/guid-faecf5ef-072c-48b1-9f35-16c5c71ac551"},{"displayName":"Related links","url":"contents/topics/guid-b2c699d7-f572-4ab4-9831-66bb7ab52e13"},{"displayName":"Special characters (count: 3) & trademark (count: 4)","url":"contents/topics/guid-971d9570-b11a-43f2-b23b-e75e262fb91d"},{"displayName":"Section, required-cleanup, screen","url":"contents/topics/guid-2c62d643-a927-4609-a022-6ee870bd55b2"},{"displayName":"Syntaxdiagram","url":"contents/topics/guid-a2c25f9f-2ca7-4cf3-825b-a5d70bb10022"},{"displayName":"Sup, sub","url":"contents/topics/guid-abc68ee3-71fb-41e0-8294-23ea3b4b3b29"},{"displayName":"Synph, tt , tutorialinfo, uicontrol, wintitle, stepresult, u, userinput, systmemoutput","url":"contents/topics/guid-70fb7bdf-c868-475e-8f2e-8f68f2ac65fc"}]
const mapTitle = "Map: N-S elements (count: 11 tr, 1 mapref)"
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


window.addEventListener('franklin-app-ready', () => {
  scrollSidenavSelectionToView()
})


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