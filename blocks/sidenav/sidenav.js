import { migrateTree } from "../utils.js";
const treeData = [{"displayName":"BlackBerry Hub","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1431440893688","children":[{"displayName":" help","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/gft1478700235725","children":[{"url":"/content/dam/bb/content/en/migration-test-move-fix-adam/testfolder1/cfl1431441083971"},{"displayName":"Keyboard shortcuts: ","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1437574875138"},{"displayName":"Adding accounts to the ","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1434636007929"},{"url":"/content/dam/bb/content/en/migration-test-move-fix-adam/testfolder1/cfl1431450898073","children":[{"displayName":"cfl1431452585667.xml","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/testfolder1/cfl1431452585667"}]},{"url":"/content/dam/bb/content/en/migration-test-move-fix-adam/testfolder1/cfl1431456326047","children":[{"displayName":"Snooze a message","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1435932459231"},{"url":"/content/dam/bb/content/en/migration-test-move-fix-adam/testfolder1/cfl1431526282187"},{"displayName":"File an email","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1431528893150"},{"displayName":"Flag or unflag a message","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1431540267694"},{"displayName":"Mark a message as read or unread","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1431541772389"},{"displayName":"Mute a conversation","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1443102373092"},{"displayName":"rsn1470675244205.xml","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/rsn1470675244205"}]},{"displayName":"Viewing and searching messages","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1431544333630","children":[{"url":"/content/dam/bb/content/en/migration-test-move-fix-adam/test-folder-2/cfl1431625159667"},{"displayName":"Go to your next or previous message","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1443103875099"},{"url":"/content/dam/bb/content/en/migration-test-move-fix-adam/test-folder-2/cfl1431626974528"},{"displayName":"View and save pictures and attachments","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1437675271269"},{"displayName":"Search for a message","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1437579457133"},{"displayName":"Search for an email attachment","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/ytc1480972094374"},{"displayName":"Add a contact or create a meeting from an email","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1438096122068"}]},{"displayName":"Securing your email","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/jcr1440165251595","children":[{"displayName":"Set up S/MIME-protected messaging","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/jcr1440165712120"},{"displayName":"Sign or encrypt a message","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/jcr1440166707450"},{"displayName":"Change secure email settings","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/jcr1440167098383"}]},{"url":"/content/dam/bb/content/en/migration-test-move-fix-adam/test-folder-2/cfl1431711832561","children":[{"displayName":"Help receive emails quicker","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/nzh1508179072326"},{"displayName":"Change general settings in the ","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1434985625061"},{"displayName":"Change the settings for an account","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1434985405020"},{"displayName":"Filter your messages","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1437587185703"},{"displayName":"Change the order of accounts in the ","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1443106136493"},{"displayName":"Create a custom alert","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1434985680959"}]},{"displayName":"Troubleshooting: ","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1438711454697","children":[{"displayName":"I can't add an email account","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1438711652819"},{"displayName":"My messages aren't syncing","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1438712372771"},{"displayName":"I can't create or change a folder","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/cfl1438783901836"}]},{"displayName":"App permissions","url":"/content/dam/bb/content/en/migration-test-move-fix-adam/rzt1531167684356"}]}]}]

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
