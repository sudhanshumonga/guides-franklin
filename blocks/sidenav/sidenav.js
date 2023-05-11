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
    span.style.width = "10px";
    span.style.height = "10px";
    span.style.minWidth = "10px";
    span.style.display = "flex";
    span.style.backgroundColor = "black";
    anchor.textContent = item.displayName;
    if (item.url) {
      anchor.setAttribute(
        "href",
        `https://main--guides_franklin--sudhanshumonga.hlx.page/${item.url}`
      );
    }
    li.classList.add("sidenav-list-item");
    if (item.children) {
        li.appendChild(span);
        li.appendChild(anchor);
        createTree(li, item.children);
    } else {
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
