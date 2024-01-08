// ==UserScript==
// @name         GameFAQS FGO spoiler block
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Blocks or covers GameFAQs board titles containing a specific keyword.
// @match        https://gamefaqs.gamespot.com/boards/*
// @grant        none
// @icon         https://gamefaqs.gamespot.com/favicon.ico
// ==/UserScript==
(function() {
  'use strict';

  // Define the keyword(s) to block
  var blockedKeywords = ["LB7", "Spoilers", "Boss", "ORT", "Nahui", "Camazotz"];

  // Select all the titles on the page
  var titles = document.querySelectorAll(".topic");

  // Iterate through each title and check if it contains the exact blocked keyword
  titles.forEach(function(title) {
    var titleText = title.innerText.toLowerCase();
    var isBlocked = false;
    var blockedKeyword = '';
    var originalHTML = title.innerHTML; // Store the original HTML content

    for (var i = 0; i < blockedKeywords.length; i++) {
      var keyword = blockedKeywords[i].toLowerCase();
      var regex = new RegExp("\\b" + keyword + "\\b");

      if (regex.test(titleText)) {
        isBlocked = true;
        blockedKeyword = blockedKeywords[i];
        break;
      }
    }

    if (isBlocked) {
      var clickCount = 0;

      if (clickCount === 0) {
        title.innerHTML = "<span style='color: white; background-color: red; padding: 2px;'>Spoiler Blocked - Click 3 times to show</span>";
      }
      title.addEventListener("click", function() {
        clickCount++;

        if (clickCount === 1) {
          title.innerHTML = "Click one more time to show blocked keyword";
        } else if (clickCount === 2) {
          title.innerHTML = "Blocked due to word: " + blockedKeyword + ", Click once more to display post";
        } else if (clickCount === 3) {
          title.innerHTML = originalHTML;
        }
      });
    }
  });
})();
