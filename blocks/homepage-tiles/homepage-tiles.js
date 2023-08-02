import sidenavTreeData from '../sidenav/sidenav_data.js'

const tilesView = document.getElementsByClassName("homepage-tiles")[0];

let currTiles = sidenavTreeData
const number_of_toc_images = 8

function getLevelFromURL() {
    let queryString = window.location.search;
    let params = new URLSearchParams(queryString);
    let id = params.get("level") || '';
    return id
}

function getTileForData(displayName, url, index) {
    const tileWrapperDiv = document.createElement("div");
    tileWrapperDiv.classList.add("tile-wrapper");
    const tileTitleHeading = document.createElement("span");
    tileTitleHeading.classList.add('span-class')

    const titleSpanDiv = document.createElement("div");
    titleSpanDiv.classList.add('title-span-div-class')

    const imageDiv = document.createElement("div");
    imageDiv.classList.add('image-div-class')
    imageDiv.classList.add(`tile_${index%number_of_toc_images + 1}`)
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
        let navURL = new URL(url, siteURL).href;
        event.preventDefault()
        event.stopPropagation()
        currTiles = currTiles[index].children
        if(!currTiles) {
            const id = getLevelFromURL()
            const newId = id + '-' + index
            url.searchParams.set("level", newId)
            window.location.href = navURL
        } else {
            construct()
        }
    })
    const text = document.createTextNode(displayName)
    tileTitleHeading.appendChild(text)
    titleSpanDiv.appendChild(tileTitleHeading)
    tileWrapperDiv.appendChild(imageDiv)
    tileWrapperDiv.appendChild(titleSpanDiv)
    return tileWrapperDiv
}

function getNodesForLevel(id) {
    const ids = id.split('-')
    let currTiles = sidenavTreeData
    ids.forEach(id => {
        currTiles = currTiles[id]
    })
    return currTiles
}

function construct() {
    tilesView.replaceChildren([]) //clear the wrapper
    const fragment = document.createDocumentFragment()
    const id = getLevelFromURL()
    const nodes = getNodesForLevel(id) || []
    nodes.map((node, idx) => {
        return getTileForData(node.displayName, node.url, idx)
    }).forEach(node => {
        fragment.appendChild(node)
    })
    tilesView.appendChild(fragment)
}

construct()
