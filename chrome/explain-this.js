 /* Explain this xkcd - a Chrome/Chromium browser extension
  * Apache License v2
  * author: Bharadwaj Raju
  */ 
 
 
// Check page title to make sure it is xkcd
if (/^xkcd:\W/.test(document.title)) {
    // Creating elements
    var explainButton = document.createElement("BUTTON");
    var buttonText = document.createTextNode("Explain this");
    explainButton.appendChild(buttonText); // Set button title
    // Appending to DOM 
    document.body.appendChild(explainButton);
}

explainButton.onclick = redirectPage();

redirectPage() {
    
    // Redirect to explain xkcd
    
    var comicName = findComicName();
    
    var comicNumber = findComicNumber();
    
    createURL(comicNumber,comicName);
    
}

findComicName() {
    
    // Find the current comic's name from page title
    
    var comicName = document.title();
    comicName = comicName.replace(^(xkcd: )\s+); // Remove leading "xkcd: "
    
    return comicName;
    
}

findComicNumber() {
    
    // Find the current comic's number from page's HTML
    
    /* Why don't we just get the comic number from the URL?
     * 
     * Because the comic number isn't mentioned in the xkcd homepage URL (hosting the latest comic)
     */
    
    var searchTerm = "Permanent link to this comic: ",
    queue = [document.body],
    curr
    ;
    while (curr = queue.pop()) {
        if (!curr.textContent.match(searchTerm)) continue;
        for (var i = 0; i < curr.childNodes.length; ++i) {
            switch (curr.childNodes[i].nodeType) {
                case Node.TEXT_NODE : // 3
                    if (curr.childNodes[i].textContent.match(searchTerm)) {
                        var elementWithComicNumber = curr;
                        // End of search
                    }
                    break;
                case Node.ELEMENT_NODE : // 1
                    queue.push(curr.childNodes[i]);
                    break;
            }
        }
    }
    
    // Remove everything except numbers
    // Conveniently gets comic number
    var comicNumber = elementWithComicNumber.replace(/[^0-9]/g, "");
    
    return comicNumber;
}

createURL(comicNumber,comicName) {
    
    // Create an appropriate explain xkcd URL
    
    var baseURL = "http://www.explainxkcd.com/wiki/index.php/";
    
    // An example explain xkcd URL: http://www.explainxkcd.com/wiki/index.php/[comicNumber]:_[comic_Name]
    
    var comicNameAsInURL = comicName.replace(/ /g,"_"); // Comic name with underscores
    
    var URL = baseURL.concat(comicNumber,":_",comicNameAsInURL);
    
    return URL;
    
}