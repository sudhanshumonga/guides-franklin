import { migrateTree } from "../utils.js";
const treeData = [{"displayName":"Personal Spaceship Operations Manual","url":"/content/dam/guides-regression/TravelDITA/Cover/personal-spaceship-operations-manual"},{"displayName":"Legal","url":"/content/dam/guides-regression/TravelDITA/Legal/legal"},{"displayName":"contacts.xml","url":"/content/dam/guides-regression/TravelDITA/Contacts/contacts"},{"displayName":"General description","url":"/content/dam/guides-regression/TravelDITA/GeneralDescription/general-description","children":[{"displayName":"History of flight","url":"/content/dam/guides-regression/TravelDITA/GeneralDescription/c-history-of-flight"},{"displayName":"Overview","url":"/content/dam/guides-regression/TravelDITA/GeneralDescription/c-overview","children":[{"displayName":"Spaceship requirements","url":"/content/dam/guides-regression/TravelDITA/GeneralDescription/r-spaceship-requirements"},{"displayName":"Launch and landing site","url":"/content/dam/guides-regression/TravelDITA/GeneralDescription/r-launch-and-landing-site"}]},{"displayName":"Vehicle structure","url":"/content/dam/guides-regression/TravelDITA/GeneralDescription/c-vehicle-structure","children":[{"displayName":"Crew area","url":"/content/dam/guides-regression/TravelDITA/GeneralDescription/c-crew-area","children":[{"displayName":"Adjust the seat temperature","url":"/content/dam/guides-regression/TravelDITA/GeneralDescription/t-adjust-the-seat-temperature"},{"displayName":"Change the seat temperature display","url":"/content/dam/guides-regression/TravelDITA/GeneralDescription/t-change-the-seat-temperature-display"},{"displayName":"Recline the seats","url":"/content/dam/guides-regression/TravelDITA/GeneralDescription/t-recline-the-seats"},{"displayName":"Adjust the lighting levels","url":"/content/dam/guides-regression/TravelDITA/GeneralDescription/t-adjust-the-lighting-levels"},{"displayName":"Use the drink dispenser","url":"/content/dam/guides-regression/TravelDITA/GeneralDescription/t-use-the-drink-dispenser"}]},{"displayName":"Wing","url":"/content/dam/guides-regression/TravelDITA/GeneralDescription/c-wing"},{"displayName":"Thermal protection","url":"/content/dam/guides-regression/TravelDITA/GeneralDescription/c-thermal-protection"}]}]},{"displayName":"Operating limitations","url":"/content/dam/guides-regression/TravelDITA/OperatingLimitations/operating-limitations","children":[{"displayName":"Engine limitations","url":"/content/dam/guides-regression/TravelDITA/OperatingLimitations/r-engine-limitations"},{"displayName":"Airspeed limitations","url":"/content/dam/guides-regression/TravelDITA/OperatingLimitations/r-airspeed-limitations","children":[{"displayName":"Takeoff","url":"/content/dam/guides-regression/TravelDITA/OperatingLimitations/r-takeoff"},{"displayName":"Entry","url":"/content/dam/guides-regression/TravelDITA/OperatingLimitations/r-entry"},{"displayName":"Landing","url":"/content/dam/guides-regression/TravelDITA/OperatingLimitations/r-landing"}]}]}]

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

function addExpandCollapseButton(container) {
  const span = document.createElement("span");
  span.classList.add('sidenav-expand-collapse')
  document.insertBefore(container, span)
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
const treeviewContainer = document.getElementsByClassName("sidenav-container")[0];
addExpandCollapseButton(treeviewContainer);
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
