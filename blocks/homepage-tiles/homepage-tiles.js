import sidenavTreeData from '../sidenav/sidenav_data.js'

const tilesView = document.getElementsByClassName("homepage-tiles")[0];

let currTiles = sidenavTreeData

function getTileForData(displayName, url, index) {
    const tileWrapperDiv = document.createElement("div");
    tileWrapperDiv.classList.add("tile-wrapper");
    const tileTitleHeading = document.createElement("span");
    const siteURL =
      window.location.protocol +
      "//" +
      window.location.hostname +
      (window.location.port ? ":" + window.location.port : "");
    tileTitleHeading.addEventListener('click', (event) => {
        let navURL = new URL(url, siteURL).href;
        window.location.href = navURL
        event.preventDefault()
        event.stopPropagation()
    })
    tileWrapperDiv.addEventListener('click', (event) => {
        event.preventDefault()
        event.stopPropagation()
        currTiles = currTiles[index]
        construct()
    })
    const text = document.createTextNode(displayName)
    tileTitleHeading.appendChild(text)
    tileWrapperDiv.appendChild(tileTitleHeading)
    return tileWrapperDiv
}

function construct() {
    tilesView.replaceChildren([]) //clear the wrapper
    const fragment = document.createDocumentFragment()
    const nodes = currTiles || []
    nodes.map((node, idx) => {
        return getTileForData(node.displayName, node.url, idx)
    }).forEach(node => {
        fragment.appendChild(node)
    })
    tilesView.appendChild(fragment)
}

construct()
