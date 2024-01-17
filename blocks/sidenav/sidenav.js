import { migrateTree } from "../utils.js";
const treeData = [{"displayName":"Abbreviated-form and term","url":"contents/topics/guid-14f66fa0-b380-4216-9e03-15e4b81c9f7d"},{"displayName":"Abstract","url":"contents/topics/guid-97846b49-4d81-4f5b-82b9-d955e4363446"},{"displayName":"Apiname, codeph, cite","url":"contents/topics/guid-5419fada-a777-4ec3-ad8b-c25d8bef48b1"},{"displayName":"Bold, codeblock, figure and related links","url":"contents/topics/guid-6ae4475e-2de4-4d32-ad77-ffa29d453cf0"},{"displayName":"Conditional attributes","url":"contents/topics/guid-2b7a967d-ae31-4a59-a9b9-747461dec343"},{"displayName":"Conref & conrefend from list.dita","url":"contents/topics/guid-fc6486c7-564c-40e8-91fe-bbbb58c41fe1"},{"displayName":"Conref'd elements","url":"contents/topics/guid-bae84d22-242e-4c45-bbd1-6b3a7c16df79"},{"displayName":"Conref & conrefend from list.dita","url":"contents/topics/guid-fc6486c7-564c-40e8-91fe-bbbb58c41fe1"},{"displayName":"List which is being conref'd in another topic","url":"contents/topics/guid-5853b213-a633-4285-828a-2ab7758c11e8"},{"displayName":"Definition List: dl, dlentry, dd, dt, dlhead, dthd, dd","url":"contents/topics/guid-c7b2f554-d065-469c-8be2-8fd3d038d93f"},{"displayName":"Examples, systemoutput, lines, pre","url":"contents/topics/guid-d69f774f-b31f-4468-aead-61916bf5dbf3"},{"displayName":"Figgroup, filepath, foreign, fragment","url":"contents/topics/guid-80e796c5-c5f4-4e0b-b196-c98f6ea110e7"},{"displayName":"Footnote and svg container","url":"contents/topics/guid-b444557c-b50d-40ee-bd7a-beb53d71339a"},{"displayName":"Indexterm & related","url":"contents/topics/guid-c49c49bc-2718-4407-bb9f-f724264f745e"},{"displayName":"Itemgroup, lines","url":"contents/topics/guid-1709fe93-c40a-4729-9aca-dd106e39ccc5"},{"displayName":"Key references from keysMap.ditamap","url":"contents/topics/guid-2ca216db-b77f-488c-ab3f-213eca65e079"},{"displayName":"Keywords from keyMap","url":"contents/topics/guid-faecf5ef-072c-48b1-9f35-16c5c71ac551"},{"displayName":"Large table (customer content)","url":"contents/topics/guid-0e7ba6a4-ce84-4282-a60a-f1774c655c28"},{"displayName":"MathML (count: 2 elements)","url":"contents/topics/guid-45faf978-9022-418c-9936-742cd94b791d"},{"displayName":"Menucascade","url":"contents/topics/guid-8aaae94c-3352-43e1-ab3e-3a67f7174c0e"},{"displayName":"Msgblock","url":"contents/topics/guid-43c489cc-9b1c-4df7-8ede-a7013e4fb3a0"},{"displayName":"Multimedia references (objects)","url":"contents/topics/guid-b81a4158-a974-4a3b-a592-059eda33d3e6"},{"displayName":"Image(right aligned) & figure (centre aligned)","url":"contents/topics/guid-fc87412a-83c0-4fcc-88be-4c1e5214294d"},{"displayName":"Images (count: 14)","url":"contents/topics/guid-ffb33401-c2e8-4e9f-b297-c596abd7b524"},{"displayName":"Imagemaps","url":"contents/topics/guid-97d5915b-c1db-402a-926f-a82c184a4e79"},{"displayName":"Notes (count: 5, multiple types)","url":"contents/topics/guid-7db7b518-48a1-4feb-8c3a-6300f9d1ab2e"},{"displayName":"Parml, parmname, pt, ph, plentry, pre, q","url":"contents/topics/guid-983f66dd-0456-4637-b78b-816ceff547a5"},{"displayName":"Task: Postreq, prereq, searchtitle, simpletable, sl, step-unordered, stepxmp, userinput","url":"contents/topics/guid-d5909da4-333d-47e8-b11b-7f2ccd2c6083"},{"displayName":"Prolog","url":"contents/topics/guid-011e02ff-f0cb-44c1-97fb-67dd99a30481"},{"displayName":"Reference: Properties Table","url":"contents/topics/guid-9b2d2e6a-6f86-4bf9-9f6d-7b494603a84c"},{"displayName":"References (without and with display text , count: 8)","url":"contents/topics/guid-ae2161f1-3ed5-4e3e-b354-05f5ef0274b7"},{"displayName":"Self references (last two elements)","url":"contents/topics/guid-5bc3c00d-3698-4af7-8b9e-97eebe33c16f"},{"displayName":"Key references from keysMap.ditamap","url":"contents/topics/guid-2ca216db-b77f-488c-ab3f-213eca65e079"},{"displayName":"Keywords from keyMap","url":"contents/topics/guid-faecf5ef-072c-48b1-9f35-16c5c71ac551"},{"displayName":"Related links","url":"contents/topics/guid-b2c699d7-f572-4ab4-9831-66bb7ab52e13"},{"displayName":"Special characters (count: 3) & trademark (count: 4)","url":"contents/topics/guid-971d9570-b11a-43f2-b23b-e75e262fb91d"},{"displayName":"Section, required-cleanup, screen","url":"contents/topics/guid-2c62d643-a927-4609-a022-6ee870bd55b2"},{"displayName":"Syntaxdiagram","url":"contents/topics/guid-a2c25f9f-2ca7-4cf3-825b-a5d70bb10022"},{"displayName":"Sup, sub","url":"contents/topics/guid-abc68ee3-71fb-41e0-8294-23ea3b4b3b29"},{"displayName":"Synph, tt , tutorialinfo, uicontrol, wintitle, stepresult, u, userinput, systmemoutput","url":"contents/topics/guid-70fb7bdf-c868-475e-8f2e-8f68f2ac65fc"},{"displayName":"Reference: Properties Table","url":"contents/topics/guid-9b2d2e6a-6f86-4bf9-9f6d-7b494603a84c"},{"displayName":"Table (with rotate set as 1 for all entry elements)","url":"contents/topics/guid-ce3fa9d4-5f0e-4aad-98b2-7f4be83917d0"},{"displayName":"Large table (customer content)","url":"contents/topics/guid-0e7ba6a4-ce84-4282-a60a-f1774c655c28"},{"displayName":"Table(right aligned)","url":"contents/topics/guid-c4e8b474-6d6a-46de-a3bf-7cecbf3cceac"},{"displayName":"Synph, tt , tutorialinfo, uicontrol, wintitle, stepresult, u, userinput, systmemoutput","url":"contents/topics/guid-70fb7bdf-c868-475e-8f2e-8f68f2ac65fc"},{"displayName":"Task: cmd, step, info, option, choice, choicetable (chdesc, choption, chrow)","url":"contents/topics/guid-ae74b695-ab9b-4b14-a8ee-8585340524ff"},{"displayName":"Troubleshooting","url":"contents/topics/guid-f0408222-6f9a-4241-8955-9f14f05a9ca6"},{"displayName":"Varname","url":"contents/topics/guid-d010080c-0bec-45e7-9b5e-39e32309e238"}]
const mapTitle = "Main Map with all assets"
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
  setTimeout(() => {
    const sidenavContainer = document.getElementsByClassName("sidenav-container")[0];
    sidenavContainer.scrollTop = element.offsetTop
  }, 2000);
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