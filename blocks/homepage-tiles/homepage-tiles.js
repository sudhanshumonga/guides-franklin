import sidenavTreeData from '../sidenav/sidenav_data.js'

function getTileForData(url) {
  const siteURL =
    window.location.protocol +
    "//" +
    window.location.hostname +
    (window.location.port ? ":" + window.location.port : "");
    let navURL = new URL(url, siteURL);
    window.location.href = navURL.toString()
}

function construct(nodeList) {//
    nodeList.forEach(node => {
        if(node.children) {
            construct(node.children)
        } else {
            getTileForData(node.url)
        }
    })
}

construct(sidenavTreeData)
