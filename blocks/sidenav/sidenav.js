import { migrateTree } from "../utils.js";
import treeData from "./sidenav_data.js";
let id = 0

const isDesktop = window.matchMedia('(min-width: 900px)');

function expandHeirarchy(element, root) {
    if(element === root) return
    let parent = element.parentElement
    parent.classList.remove('closed')
    expandHeirarchy(parent, root)
}

function expandSelection(parent) {
    let queryString = window.location.search;
    let params = new URLSearchParams(queryString);
    let id = params.get('expand')
    let element = document.getElementById(`sidenav-li-${id}`)
    if(!element) return
    element.classList.add('selected')
    expandHeirarchy(element, parent)
    element.scrollIntoView();
}

function createTree(parent, data) {
  const ul = document.createElement("ul");
  ul.classList.add("tree");
  parent.appendChild(ul);
  data.forEach((item) => {
    const li = document.createElement("li");
    const _id = id++
    li.setAttribute("id", `sidenav-li-${_id}`)
    ul.appendChild(li);
    const anchor = document.createElement("a");
    const span = document.createElement("span");
    span.classList.add('chevron-icon-span')
    span.textContent = '>'
    anchor.textContent = item.displayName;
    anchor.setAttribute('data-li-id', _id)
    const siteURL = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    if (item.url) {
      let navURL = `${siteURL}/${item.url}`
      anchor.setAttribute(
        "href",
        navURL
      );
      anchor.addEventListener('click', (event) => {
        event.preventDefault()
        onClick(anchor.getAttribute('data-li-id'), navURL)
      })
    }
    li.classList.add("sidenav-list-item");
    li.classList.add("closed");
    if (item.children) {
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
createTree(treeview, treeData);
migrateTree()
isDesktop.addEventListener('change', () => migrateTree())
expandSelection(treeview)

// Add click event listener to each span element
treeview.querySelectorAll("span").forEach((span) => {
  span.addEventListener("click", (event) => {
    // Toggle the "closed" class on the parent li element
    event.currentTarget.parentNode.classList.toggle("closed");
  });
});
