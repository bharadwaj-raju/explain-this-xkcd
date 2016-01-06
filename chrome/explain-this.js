 /* Explain this xkcd - a Chrome/Chromium browser extension
  * Apache License v2
  * author: Bharadwaj Raju
  */


// Check page title to make sure it is xkcd
if (/xkcd:\W/.test(document.title)) {
    // Creating elements
    var explainButton = document.createElement("BUTTON");

    var buttonText = document.createTextNode("Explain this");

    explainButton.appendChild(buttonText); // Set button title

    // Set CSS styles
    explainButton.style.background-color = "#6E6E6E";
    explainButton.style.background-color = "#6E7B91";
    explainButton.style.color = "#FFF";
    explainButton.style.border = "1.5px solid #333";
    explainButton.style.font-size = "16px";
    explainButton.style.font-weight = "600";
    explainButton.style.padding = "1.5px 12px";
    explainButton.style.margin = "0 4px";
    explainButton.style.text-decoration = "none";
    explainButton.style.border-radius = "3px";
    explainButton.style.-webkit-border-radius = "3px";
    explainButton.style.box-shadow = "0 0 5px 0 gray";
    explainButton.style.-webkit-box-shadow = "0 0 5px 0 gray";

    // Appending to DOM
    document.body.appendChild(explainButton);
}

explainButton.addEventListener("click", redirectPage);

function redirectPage() {

    // Redirect to explain xkcd

    var comicName = findComicName();

    var explainURL = createURL(comicName);

    window.location.assign(explainURL)
}

function findComicName() {

    // Find the current comic's name from page title

    var comicName = document.title.toString();
    comicName = comicName.replace(/xkcd: /i, ""); // Remove leading "xkcd: "

    return comicName;
}

function createURL(comicName) {

    // Create an appropriate explain xkcd URL

    var baseURL = "http://www.explainxkcd.com/wiki/index.php/";

    // An example explain xkcd URL: http://www.explainxkcd.com/wiki/index.php/[comicNumber]:_[comic_Name]

    var comicNameAsInURL = comicName.replace(/ /g,"_"); // Comic name with underscores

    var URL = baseURL.concat(comicNameAsInURL);

    return URL;

}
