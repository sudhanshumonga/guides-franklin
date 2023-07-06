var content = document.querySelector('body')
var headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6");
var minitocContainer = content.getElementsByClassName("minitoc")[0];
var miniTOCList = document.createElement("ul");
const tagList = []
for (var i = 0; i < headings.length; i++) {
  var heading = headings[i];
  var headingLevel = parseInt(heading.tagName[1]);
  var listItem = document.createElement("li");
  listItem.classList.add(`minitoc-level-${headingLevel}`)
  var link = document.createElement("a");
  link.textContent = heading.textContent;
  link.href = "#" + heading.id;
  listItem.appendChild(link);
  miniTOCList.appendChild(listItem);
  tagList.push(listItem)
}
if(headings.length !== 0) {
    var h2minitocText = document.createElement('h2')
    h2minitocText.classList.add('minitoc-title')
    var textNode = document.createTextNode("On this page")
    miniTOCList.classList.add('minitoc-list')
    h2minitocText.appendChild(textNode)
    minitocContainer.appendChild(h2minitocText)
    minitocContainer.appendChild(miniTOCList)
}

window.addEventListener('franklin-website-ready', () => {
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
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
    tag.addEventListener('click', () => {
      for (let j = 0; j < tagList.length; j++) {
        tagList[j].classList.remove('selected');
      }
      tag.classList.add('selected');
    })
  })
  const contentArea = content.querySelector('main > div:nth-child(2)')
  contentArea.addEventListener('scroll', updateSelectedTag);
  contentArea.addEventListener('resize', updateSelectedTag);
});