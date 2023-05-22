var blockedKeywords = ["ort", "keyword2", "keyword3"];
var titles = document.querySelectorAll(".topic");


titles.forEach(function(title) {
    var titleText = title.innerText.toLowerCase();

    if (blockedKeywords.some(function(keyword) {
        return titleText.includes(keyword.toLowerCase());
    })) {


        title.innerHTML = "<span style='color: white; background-color: black; padding: 2px;'>Spoiler Warning</span>";
    }
});
