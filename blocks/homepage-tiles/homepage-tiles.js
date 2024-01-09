import sidenavTreeData from '../sidenav/sidenav_data.js'

function getTileForData(url, id) {
    const siteURL =
        window.location.protocol +
        "//" +
        window.location.hostname +
        (window.location.port ? ":" + window.location.port : "");
    let navURL = new URL(url, siteURL);
    navURL.searchParams.set("expand", id)
    window.location.href = navURL.toString()
}

function generateId(prefix, suffix) {
    if (prefix) {
        return `${prefix}-${suffix}`
    }
    return `${suffix}`
}

function construct(nodeList, prefixID) {
    nodeList.every((node, idx) => {
        const id = generateId(prefixID, idx)
        if (node.children) {
            return construct(node.children, id)
        } else {
            getTileForData(node.url, id)
            return false
        }
    })
    return true
}

construct(sidenavTreeData, '')
