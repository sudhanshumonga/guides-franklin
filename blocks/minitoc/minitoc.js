var content = document.querySelector('body')
var headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6");
var minitocContainer = content.getElementsByClassName("minitoc")[0];
var miniTOCList = document.createElement("ul");
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
