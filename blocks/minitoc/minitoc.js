var content = document.querySelector('body')
var headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6");
var minitocContainer = content.getElementById("minitoc");
var miniTOCList = document.createElement("ul");
miniTOCList.classList.add('minitoc-list')
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
