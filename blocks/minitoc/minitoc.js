var content = document.querySelector('body')
var headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6");
var minitocContainer = content.getElementsByClassName("minitoc")[0];

// Create a nested minitoc structure
var currentLevel = 1;
var currentList = minitocContainer;
for (var i = 0; i < headings.length; i++) {
  var heading = headings[i];
  var headingLevel = parseInt(heading.tagName[1]);

  // Skip if heading level is less than current level
  if (headingLevel < currentLevel) {
    continue;
  }

  // Create list item for the heading
  var listItem = document.createElement("li");
  var link = document.createElement("a");
  link.textContent = heading.textContent;
  link.href = "#" + heading.id;
  listItem.appendChild(link);

  // Append the list item to the current list
  currentList.appendChild(listItem);

  if (headingLevel > currentLevel) {
    // Create a new nested list
    var nestedList = document.createElement("ul");
    listItem.appendChild(nestedList);
    currentList = nestedList;
  } else if (headingLevel < currentLevel) {
    // Move up to the appropriate level
    var diff = currentLevel - headingLevel;
    for (var j = 0; j < diff; j++) {
      currentList = currentList.parentElement.parentElement;
    }
  }

  currentLevel = headingLevel;
}
