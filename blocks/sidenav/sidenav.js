import { migrateTree } from "../utils.js";
const treeData = [{"displayName":"Personal Spaceship Operations Manual","url":"/content/dam/guides-regression/TravelDITA/Cover/personal-spaceship-operations-manual"},{"displayName":"Legal","url":"/content/dam/guides-regression/TravelDITA/Legal/legal"},{"displayName":"Contacts","url":"/content/dam/guides-regression/TravelDITA/Contacts/contacts"},{"url":"/content/dam/guides-regression/TravelDITA/GeneralDescription/general-description","children":[{"url":"GUID-7a16a6d2-4e3c-46dc-9467-1a2fbd137fec"},{"url":"GUID-320b2337-32ff-45ef-ad71-569277023a86"},{"url":"GUID-ae53120e-fd31-451c-93c5-c7033dae0f26"}]},{"url":"/content/dam/guides-regression/TravelDITA/Systems/systems"},{"url":"/content/dam/guides-regression/TravelDITA/OperatingLimitations/operating-limitations"}]

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
