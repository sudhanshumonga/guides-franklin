import { migrateTree } from "../utils.js";
const treeData = [{"displayName":"","url":"contents/tasks/changingtheoil"},{"displayName":"","url":"contents/tasks/organizing"},{"displayName":"","url":"contents/tasks/spraypainting"},{"displayName":"","url":"contents/tasks/takinggarbage"},{"displayName":"","url":"contents/tasks/washingthecar"},{"displayName":"","url":"contents/concepts/lawnmower"},{"displayName":"","url":"contents/concepts/oil"},{"displayName":"","url":"contents/concepts/paint"},{"displayName":"","url":"contents/concepts/shelving"},{"displayName":"","url":"contents/concepts/snowshovel"},{"displayName":"","url":"contents/concepts/toolbox"},{"displayName":"","url":"contents/concepts/waterhose"},{"displayName":"","url":"contents/concepts/wheelbarrow"},{"displayName":"","url":"contents/concepts/workbench"},{"displayName":"","url":"contents/concepts/wwfluid"}]

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

function addResizeBar(sidenavBlock) {
  const div = document.createElement("div");
  div.classList.add('sidenav-resize-bar');
  let isResizing = false
  div.onmousedown((evt) => {
    isResizing = true
    document.onmousemove(function (event) {
      if (isResizing) {
        let newWidth = event.pageX - sidenavBlock.offsetLeft;
        sidenavBlock.style.width = `${newWidth} px`;
      }
    })
  })
  document.onmousemove(function () {
    if (isResizing) {
      isResizing = false;
    }
  })
  const sidenavContainer = document.getElementsByClassName("sidenav-container")[0];
  sidenavContainer.insertAdjacentElement("afterend", div)
}

function addExpandCollapseButton() {
  const span = document.createElement("span");
  span.classList.add('sidenav-expand-collapse')
  span.classList.add('open')
  span.addEventListener('click', () => {
    const isOpen = span.classList.contains('open')
    const sidenavContainer = document.getElementsByClassName("sidenav-container")[0];
    (!isOpen) ? sidenavContainer.classList.remove('force-hide') : sidenavContainer.classList.add('force-hide')
    span.classList.toggle("open");
  })
  const main = document.getElementsByTagName('main')[0]
  main.prepend(span)
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
