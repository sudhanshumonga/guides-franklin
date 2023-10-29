var content = document.querySelector('body')
var headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6");
var minitocContainer = content.getElementsByClassName("minitoc")[0];
var miniTOCList = document.createElement("ul");
const tagList = []
for (var i = 0; i < headings.length; i++) {
  var heading = headings[i];
  var headingLevel = parseInt(heading.tagName[1]);
  var listItem = document.createElement("li");
  listItem.classList.add(`minitoc-level`)
  listItem.classList.add(`minitoc-level-${headingLevel}`)
  var link = document.createElement("a");
  link.textContent = heading.textContent;
  if(!heading.textContent) {
    continue
  }
  link.href = "#" + heading.id;
  listItem.appendChild(link);
  miniTOCList.appendChild(listItem);
  tagList.push(listItem)
}
if(tagList.length !== 0) {
    var h2minitocText = document.createElement('h2')
    h2minitocText.classList.add('minitoc-title')
    var textNode = document.createTextNode("In this article")
    miniTOCList.classList.add('minitoc-list')
    h2minitocText.appendChild(textNode)
    minitocContainer.appendChild(h2minitocText)
    minitocContainer.appendChild(miniTOCList)
} else {
  const minitocContainerSection = document.getElementsByClassName('minitoc-container')[0]
  minitocContainerSection.classList.add('force-hide')
}

window.addEventListener('franklin-app-ready', () => {
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 100 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || (document.documentElement.clientHeight - 100)) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  function updateSelectedTag() {
    for (let i = 0; i < headings.length; i++) {
      if (isInViewport(headings[i])) {
        for (let j = 0; j < tagList.length; j++) {
          tagList[j].classList.remove('selected');
        }
        
        tagList[i].classList.add('selected');
        break;
      }
    }
  }
  tagList.forEach(tag => {
    tag.addEventListener('click', (event) => {
      event.preventDefault();
      setTimeout(() => {
        for (let j = 0; j < tagList.length; j++) {
          tagList[j].classList.remove('selected');
        }
        tag.classList.add('selected');
        const a_tag = tag.children[0]
        if(a_tag) {
          let href = a_tag.attributes['href'].value
          let target_id
          if(href) {
            target_id = href[0] === '#' ? href.substr(1, href.length - 1) : href
          }
          let targetNode
          for (var i = 0; i < headings.length; i++) {
            let heading = headings[i]
            let id = heading.attributes['id'].value
            if(id === target_id) {
              targetNode = heading
              break;
            }
          }
          if(targetNode) {
            targetNode.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest', offsetTop: 100 })
          }
        }
      }, 0)
    })
  })
  const contentSection = document.querySelector('.section.breadcrumbs-container')
  contentSection.addEventListener('scroll', updateSelectedTag);
  window.addEventListener('resize', updateSelectedTag);
  updateSelectedTag()
});