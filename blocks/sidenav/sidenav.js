import { migrateTree } from "../utils.js";
const treeData = [{"displayName":"GUID-a7cd8341-d925-4278-9469-cc9316195493.ditamap","url":"/content/dam/pdf/ditamap-1-flattened/guid-a7cd8341-d925-4278-9469-cc9316195493","children":[{"displayName":"Abbreviated-form and term","url":"/content/dam/pdf/ditamap-1-flattened/guid-14f66fa0-b380-4216-9e03-15e4b81c9f7d"},{"displayName":"test.dita","url":"/content/dam/pdf/ditamap-1-flattened/test"},{"displayName":"Abstract","url":"/content/dam/pdf/ditamap-1-flattened/guid-97846b49-4d81-4f5b-82b9-d955e4363446"},{"displayName":"Apiname, codeph, cite","url":"/content/dam/pdf/ditamap-1-flattened/guid-5419fada-a777-4ec3-ad8b-c25d8bef48b1"},{"displayName":"Bold, codeblock, figure and related links","url":"/content/dam/pdf/ditamap-1-flattened/guid-6ae4475e-2de4-4d32-ad77-ffa29d453cf0"},{"displayName":"Map: Conditional attributes(1) & ditaval(4)","url":"/content/dam/pdf/ditamap-1-flattened/guid-983d9076-651a-4fd7-8de4-3f5961486e2d","children":[{"displayName":"Conditional attributes","url":"/content/dam/pdf/ditamap-1-flattened/guid-2b7a967d-ae31-4a59-a9b9-747461dec343"}]},{"displayName":"Map: Glossary references (key value : a, b)","url":"/content/dam/pdf/ditamap-1-flattened/guid-e710b704-f677-4d58-aebe-15e3eeb62262","children":[{"displayName":"g1","url":"/content/dam/pdf/ditamap-1-flattened/guid-e95e302c-3753-4fc0-bec8-a45e65d4bdae"},{"displayName":"g2","url":"/content/dam/pdf/ditamap-1-flattened/guid-61b844c4-a13c-486a-b9f4-839878c21e0a"}]},{"displayName":"Map: Reuse content (4 topicrefs)","url":"/content/dam/pdf/ditamap-1-flattened/guid-79c72469-2107-42df-82c4-6a16b2eec5ab","children":[{"url":"guid-fc6486c7-564c-40e8-91fe-bbbb58c41fe1"},{"displayName":"Conref'd elements","url":"/content/dam/pdf/ditamap-1-flattened/guid-bae84d22-242e-4c45-bbd1-6b3a7c16df79"},{"displayName":"Conref & conrefend from list.dita","url":"/content/dam/pdf/ditamap-1-flattened/guid-fc6486c7-564c-40e8-91fe-bbbb58c41fe1"},{"displayName":"List which is being conref'd in another topic","url":"/content/dam/pdf/ditamap-1-flattened/guid-5853b213-a633-4285-828a-2ab7758c11e8"}]}]},{"displayName":"Map: D-H elements (4 tr)","url":"/content/dam/pdf/ditamap-1-flattened/guid-7667529d-d866-4796-9402-f8db99c125f8","children":[{"displayName":"Definition List: dl, dlentry, dd, dt, dlhead, dthd, dd","url":"/content/dam/pdf/ditamap-1-flattened/guid-c7b2f554-d065-469c-8be2-8fd3d038d93f"},{"displayName":"Examples, systemoutput, lines, pre","url":"/content/dam/pdf/ditamap-1-flattened/guid-d69f774f-b31f-4468-aead-61916bf5dbf3"},{"displayName":"Figgroup, filepath, foreign, fragment","url":"/content/dam/pdf/ditamap-1-flattened/guid-80e796c5-c5f4-4e0b-b196-c98f6ea110e7"},{"displayName":"Footnote and svg container","url":"/content/dam/pdf/ditamap-1-flattened/guid-b444557c-b50d-40ee-bd7a-beb53d71339a"}]}]

let id = 0;

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

function createTree(parent, data) {
  const ul = document.createElement("ul");
  ul.classList.add("tree");
  parent.appendChild(ul);
  data.forEach((item) => {
    const li = document.createElement("li");
    const _id = id++;
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
      createTree(li, item.children);
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
createTree(treeview, treeData);
migrateTree(isDesktop);
isDesktop.addEventListener("change", () => migrateTree(isDesktop));
expandSelection(treeview);

// Add click event listener to each span element
treeview.querySelectorAll("span").forEach((span) => {
  span.addEventListener("click", (event) => {
    // Toggle the "closed" class on the parent li element
    event.currentTarget.parentNode.classList.toggle("closed");
  });
});
