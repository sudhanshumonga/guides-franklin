import { migrateTree } from "../utils.js";
const treeData = [{"displayName":"A note to beta participants","url":"/content/dam/bb/content/en/ns-test-move-fix-2/cid1528813394359"},{"displayName":"What is ?","url":"/content/dam/bb/content/en/ns-test-move-fix-2/krr1520536780494","children":[{"url":"guid-7528ca12-690b-44c6-80db-0512a7e97ee5-en"},{"url":"guid-074c4af0-ade4-4e16-a803-fcbf61bf9a5f-en"},{"url":"guid-b33d8bdf-cbc1-4fe5-8c23-d790e6ad13d6-en"},{"url":"guid-f777e4e8-0f81-45fe-8da4-690f4bf2ba44-en"},{"url":"guid-0ca9fafc-2e3d-47b2-9cf9-e4f084a64d32-en"}]},{"displayName":"Using ","url":"/content/dam/bb/content/en/ns-test-move-fix-2/lvb1520537067654"},{"displayName":"Managing connections","url":"/content/dam/bb/content/en/ns-test-move-fix-2/cbt1520537269124","children":[{"url":"guid-cc22bddf-a8ef-46c3-b7c2-62d16808a809-en"},{"url":"guid-674c24db-7670-4533-a095-5063708b64a8-en"},{"url":"guid-507a63e8-f073-4fb4-8045-43ff43f1f273-en","children":[{"url":"guid-84eb92a2-55f4-4a32-bf65-263dde8df58a-en"}]},{"url":"guid-b5ae20df-f632-4990-8a6b-6a9540fcb0af-en"},{"url":"guid-f8fcd311-dc5a-4a84-9cc4-ce704d9203e2-en"},{"url":"guid-fc00847a-1260-43b6-b0e0-2ba364fcfe49-en","children":[{"url":"guid-ec4e30d4-8146-4141-a5af-e56a5bcb45cc-en"}]}]},{"displayName":"Managing Org Connect","url":"/content/dam/bb/content/en/ns-test-move-fix-2/pat1520537481977"},{"displayName":"Audit and logging","url":"/content/dam/bb/content/en/ns-test-move-fix-2/jhs1520537722180"},{"displayName":"Submit feedback","url":"/content/dam/bb/content/en/ns-test-move-fix-2/maw1520537876208"},{"displayName":"Legal notice","url":"/content/dam/bb/content/en/ns-test-move-fix-2/oqo1534519198974"}]

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
