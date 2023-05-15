import treeData from "./sidenav_data.js";
let id = 0

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
    let element = parent.getElementById(id)
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
    li.setAttribute("id", id++)
    ul.appendChild(li);
    const anchor = document.createElement("a");
    const span = document.createElement("span");
    span.classList.add('chevron-icon-span')
    span.textContent = '>'
    anchor.textContent = item.displayName;
    const siteURL = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    if (item.url) {
      anchor.setAttribute(
        "href",
        `${siteURL}/${item.url}`
      );
      anchor.addEventListener('click', () => {
        onClick(id - 1)
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

function onClick(id) {
    let queryString = window.location.search;
    let params = new URLSearchParams(queryString);
    params.set('expand', id);
    window.location.search = params.toString();
}

// Get the treeview element and create the tree
const treeview = document.getElementsByClassName("sidenav")[0];
createTree(treeview, treeData);
expandSelection(treeview)

// Add click event listener to each span element
treeview.querySelectorAll("span").forEach((span) => {
  span.addEventListener("click", (event) => {
    // Toggle the "closed" class on the parent li element
    event.currentTarget.parentNode.classList.toggle("closed");
  });
});
