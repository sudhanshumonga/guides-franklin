import treeData from "./sidenav_data.js";

function createTree(parent, data) {
  const ul = document.createElement("ul");
  ul.classList.add("tree");
  parent.appendChild(ul);
  data.forEach((item) => {
    const li = document.createElement("li");
    ul.appendChild(li);
    const anchor = document.createElement("a");
    const span = document.createElement("span");
    span.classList.add('chevron-icon-span')
    span.textContent = '>'
    anchor.textContent = item.displayName;
    if (item.url) {
      anchor.setAttribute(
        "href",
        `https://main--guides_franklin--sudhanshumonga.hlx.page/${item.url}`
      );
    }
    li.classList.add("sidenav-list-item");
    if (item.children) {
        const wrapperSpan = document.createElement("span");
        wrapperSpan.classList.add("chevron-text-wrapper");
        wrapperSpan.appendChild(span);
        wrapperSpan.appendChild(anchor);
        li.appendChild(wrapperSpan);
        createTree(li, item.children);
    } else {
        li.appendChild(anchor);
        li.classList.add("closed");
    }
  });
}

// Get the treeview element and create the tree
const treeview = document.getElementsByClassName("sidenav")[0];
createTree(treeview, treeData);

// Add click event listener to each span element
treeview.querySelectorAll("span").forEach((span) => {
  span.addEventListener("click", (event) => {
    // Toggle the "closed" class on the parent li element
    event.currentTarget.parentNode.classList.toggle("closed");
  });
});
