import { migrateTree } from "../utils.js";
const treeData = [{"displayName":"General Files","url":"","children":[{"displayName":"Guide to Scenarios ","url":"contents/topics/c-guide-to-scenarios"},{"displayName":"Product Name Variables","url":"contents/topics/r-productname-variables"},{"displayName":"Image Warehouse","url":"contents/topics/r-image-warehouse"}]},{"displayName":"ThunderBird StormCluster System","url":"","children":[{"displayName":" Solution architecture overview","url":"contents/topics/c-architecture-overview"},{"displayName":"Analytical reporting with ","url":"contents/topics/c-product-about"},{"displayName":"Security architecture","url":"contents/topics/c-security"},{"displayName":"Ease of management","url":"contents/topics/c-ease-of-management"},{"displayName":"\n   features and\n  benefits","url":"contents/topics/c-architecture-combined"},{"displayName":" component\n  interaction","url":"contents/topics/c-components"},{"displayName":"Hardware and software requirements","url":"contents/topics/r-supported-platforms"},{"displayName":"Quick Reference: basic cluster management commands","url":"contents/topics/r-manage-clusters"},{"displayName":"Cluster management basic commands","url":"contents/topics/r-cluster-mgmt-commands"},{"displayName":"Command: jobconf","url":"contents/topics/r-jobconf"},{"displayName":"Command: jtub","url":"contents/topics/r-jtub"},{"displayName":"Description of jobconf command","url":"contents/topics/c-jobconf-description"},{"displayName":"Description of jtub command","url":"contents/topics/c-jtub-description"},{"displayName":"Cluster capacity reports","url":"contents/topics/c-cluster-capacity"},{"displayName":"Cluster management controls","url":"contents/topics/c-cluster-management"},{"displayName":"Cluster notification templates","url":"contents/topics/c-notification-templates"},{"displayName":"Cluster reselection rules","url":"contents/topics/c-cluster-reselection"},{"displayName":"Troubleshooting non-reporting clusters","url":"contents/topics/t-troubleshooting-cluster-not-reporting"},{"displayName":"Troubleshooting the inability to add a cluster","url":"contents/topics/t-troubleshooting-cannot-add-cluster"},{"displayName":"Activating ","url":"contents/topics/t-activate"},{"displayName":"Configuring idle job detection","url":"contents/topics/t-configure-idle-detection"},{"displayName":"Acknowledging threshold alerts","url":"contents/topics/t-acknowledge-alert"},{"displayName":"Adding or editing clusters ","url":"contents/topics/t-add-cluster"},{"displayName":"Adding a host to the cluster as a client","url":"contents/topics/t-add-host-cluster-client"},{"displayName":"Setting cluster metadata","url":"contents/topics/t-view-edit-metadata"},{"displayName":"Enabling grid control","url":"contents/topics/t-configure-grid-control"},{"displayName":"Configuring memory settings","url":"contents/topics/t-set-memory-limits"},{"displayName":"Setting host preference","url":"contents/topics/t-set-host-preference"},{"displayName":"Adding classifiers","url":"contents/topics/t-adding-classifiers"},{"displayName":"Adding columns to a dynamic reporting table","url":"contents/topics/t-adding-columns-dynamic-table"},{"displayName":"Creating dynamic reporting tables","url":"contents/topics/t-creating-dynamic-tables"},{"displayName":"Creating a limiter","url":"contents/topics/t-creating-limiter"},{"displayName":"Defining subscriber attributes","url":"contents/topics/t-defining-subscriber-attributes"},{"displayName":"Diverting to host destinations","url":"contents/topics/t-diverting-hosts"},{"displayName":"Setting common resource definitions","url":"contents/topics/t-set-resource-definitions"},{"displayName":"Registering a resource","url":"contents/topics/t-registering-file"},{"displayName":"Setting timeout and wait times","url":"contents/topics/t-set-timeout"},{"displayName":"Resource actions and destinations","url":"contents/topics/c-resource-destinations"},{"displayName":"Payload definition","url":"contents/topics/c-about-defining-payload"},{"displayName":"Attribute and parameter syntax","url":"contents/topics/c-attribute-parameter-syntax"},{"displayName":"Flowrate capacity","url":"contents/topics/c-bitrate"},{"displayName":"About capture file names","url":"contents/topics/c-capture-files"},{"displayName":"Command class","url":"contents/topics/c-command-class"},{"displayName":"Command foundation","url":"contents/topics/c-command-foundation"},{"displayName":"Analysis dimensions","url":"contents/topics/r-dimensions-reports"},{"displayName":"Interface bypass group is in active\nmode","url":"contents/topics/r-interface-bypass-group-is-in-active-mode"},{"displayName":"Resource file parameters","url":"contents/topics/r-resource-files"},{"displayName":"Faulty physical drive","url":"contents/topics/r-faulty-physical-drive"},{"displayName":"Interface bypass","url":"contents/topics/r-interface-drops"},{"displayName":"Physical drive not faulted","url":"contents/topics/r-physical-drive-not-faulted"},{"displayName":"Logical drive strength","url":"contents/topics/r-logical-drive"},{"displayName":"Query filters","url":"contents/topics/r-mv-query-filters"},{"displayName":"Analysis pane columns","url":"contents/topics/r-mv-analysis-columns"}]},{"displayName":"MobileView Application","url":"","children":[{"displayName":"About \n   ","url":"contents/topics/c-mv-about-mobileview"},{"displayName":"About this guide","url":"contents/topics/c-mv-about-guide"},{"displayName":"How  is organized","url":"contents/topics/c-mv-organization"},{"displayName":"Workspace environment","url":"contents/topics/c-mv-workspace-tab"},{"displayName":"System performance","url":"contents/topics/c-mv-performance-tab"},{"displayName":"System diagnostics","url":"contents/topics/c-mv-diagnostics-tab"},{"displayName":"Customize Views","url":"contents/topics/c-mv-customize-views"},{"displayName":"Messaging Overview","url":"contents/topics/c-mv-managing-messages"},{"displayName":"Logging on to ","url":"contents/topics/t-mv-logging-on"},{"displayName":"Generating data views","url":"contents/topics/t-mv-generating-data-views"},{"displayName":"Troubleshooting cluster reporting problems","url":"contents/topics/t-mv-troubleshooting-clusters"},{"displayName":"Query warning messages","url":"contents/topics/r-mv-query-messages"},{"displayName":"System notifications","url":"contents/topics/r-mv-system-notifications"},{"displayName":"Quick reference: data views","url":"contents/topics/r-mv-quickref-dataview"},{"displayName":"Quick reference: System health indicators","url":"contents/topics/r-mv-quickref-health-indicators"},{"displayName":"Frequently Asked Questions","url":"contents/topics/faq"}]}]
const mapTitle = "Admin Control Map"
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
    let anchor = document.createElement("a");
    if(item.children) {
      anchor = document.createElement("span");
    }
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