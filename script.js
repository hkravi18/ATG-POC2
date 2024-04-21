console.log("Tab Title Extension!");
document.getElementById("tab-btn").addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var currentTab = tabs[0];
      document.getElementById("tab-name").textContent = currentTab.title;
  });
});
