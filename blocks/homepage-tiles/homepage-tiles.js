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

function generateId(prefix, suffix) {
    if(prefix) {
        return prefix + '-' + suffix
    }
    return suffix
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
    let navURL = new URL(url, siteURL).href;
    tileTitleHeading.addEventListener('click', (event) => {
        window.location.href = navURL
        event.preventDefault()
        event.stopPropagation()
    })
    tileWrapperDiv.addEventListener('click', (event) => {
        let UrlObj = new URL(url, siteURL);
        event.preventDefault()
        event.stopPropagation()
        currTiles = currTiles[index].children
        const id = getLevelFromURL()
        const newId = generateId(id, index)
        UrlObj.searchParams.set("level", newId)
        if(!currTiles) {
            window.location.href = navURL
        } else {
            window.location.href = UrlObj.toString()
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

function getNodesForLevel(urlId) {
    let treeData = sidenavTreeData
    if(urlId === "") return treeData
    const ids = urlId.split('-')
    ids.forEach(id => {
        treeData = treeData[id]
    })
    return treeData
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
