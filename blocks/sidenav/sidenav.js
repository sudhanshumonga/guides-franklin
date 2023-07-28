import { migrateTree } from "../utils.js";
const treeData = [{"displayName":"A note to beta participants","url":"/content/dam/bb/content/en/ns-test-move-fix-2/cid1528813394359"},{"displayName":"What is ?","url":"/content/dam/bb/content/en/ns-test-move-fix-2/krr1520536780494","children":[{"displayName":"gbx1524148734140.xml","url":"/content/dam/bb/content/en/ns-test-move-fix/gbx1524148734140"},{"displayName":"Getting started with ","url":"/content/dam/bb/content/en/ns-test-move-fix-2/oxm1520536825687"},{"displayName":"Requirements","url":"/content/dam/bb/content/en/ns-test-move-fix-2/caz1528464187364"},{"displayName":"Register your organization in the  management\n        console","url":"/content/dam/bb/content/en/ns-test-move-fix-2/fdz1520536941696"},{"displayName":"Submit your \n        registration ","url":"/content/dam/bb/content/en/ns-test-move-fix-2/obf1520537039233"}]},{"displayName":"Using ","url":"/content/dam/bb/content/en/ns-test-move-fix-2/lvb1520537067654","children":[{"displayName":"Log in to ","url":"/content/dam/bb/content/en/ns-test-move-fix-2/wmo1520537233229"}]},{"displayName":"Managing connections","url":"/content/dam/bb/content/en/ns-test-move-fix-2/cbt1520537269124","children":[{"displayName":"Search for an organization","url":"/content/dam/bb/content/en/ns-test-move-fix-2/uxi1520537320615"},{"displayName":"View organization details","url":"/content/dam/bb/content/en/ns-test-move-fix-2/yan1520537359445"},{"displayName":"Request a connection","url":"/content/dam/bb/content/en/ns-test-move-fix-2/uja1520537389221","children":[{"displayName":"Cancel a pending connection request","url":"/content/dam/bb/content/en/ns-test-move-fix-2/qbq1528210323512"}]},{"displayName":"Invite an unlisted organization","url":"/content/dam/bb/content/en/ns-test-move-fix-2/gct1524768608636"},{"displayName":"yho1527188730449.xml","url":"/content/dam/bb/content/en/ns-test-move-fix-2/yho1527188730449"},{"displayName":"Decline a connection request","url":"/content/dam/bb/content/en/ns-test-move-fix-2/goh1520537445641"}]},{"displayName":"Managing Org Connect","url":"/content/dam/bb/content/en/ns-test-move-fix-2/pat1520537481977","children":[{"displayName":"Edit your organization's profile","url":"/content/dam/bb/content/en/ns-test-move-fix-2/hjl1520537563057"},{"displayName":"Edit visibility for your organization","url":"/content/dam/bb/content/en/ns-test-move-fix-2/yhn1521139372597"},{"displayName":"Add \n        administrators","url":"/content/dam/bb/content/en/ns-test-move-fix-2/hvg1520537638360"}]},{"displayName":"Audit and logging","url":"/content/dam/bb/content/en/ns-test-move-fix-2/jhs1520537722180","children":[{"displayName":"Export audit events to a .csv file","url":"/content/dam/bb/content/en/ns-test-move-fix-2/jbv1534519371005"}]},{"displayName":"Submit feedback","url":"/content/dam/bb/content/en/ns-test-move-fix-2/maw1520537876208"},{"displayName":"Legal notice","url":"/content/dam/bb/content/en/ns-test-move-fix-2/oqo1534519198974"}]

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
