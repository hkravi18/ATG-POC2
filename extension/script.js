const { SERVER_URL, PAGE_LOAD_TIME } = require("./constants.js");

console.log("LinkedIn Profiles Extension!");

//event listeners on open linkedin profile button
document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("open-btn");

    openBtn.addEventListener("click", function () {
        const textarea = document.querySelector(".profile-input");
        let UrlStrings = textarea.value;

        //trimming any extra space on either side
        UrlStrings = UrlStrings.trim();

        //no input given
        if (UrlStrings.length === 0) {
            alert("Profile URLs are required, Please fill all the fields.");
            return;
        }

        //splitting the input into an array of urls
        let profileUrls = UrlStrings.split(",");

        //checking if the url count is atleast 3
        if (profileUrls.length < 3) {
            alert("Please enter at least 3 URLs.");
            return;
        }

        //removing any extra space on either side of the urls
        profileUrls = profileUrls.map(url => url.trim());

        //removing empty strings and checking for at least 3 non empty urls
        profileUrls = profileUrls.filter(url => url.length > 0);
        if (profileUrls.length < 3) {
            alert("Please enter at least 3 valid URLs.");
            return;
        }

        //opening tabs for each url
        profileUrls.forEach(url => {
            chrome.tabs.create({ url: url, active: false }, function (tab) {
                //wating for the page to reload
                setTimeout(() => {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        function: scrapeProfileData,
                    }, (injectionResults) => {
                        const data = injectionResults[0].result;

                        //adding url to data 
                        data["url"] = url;

                        //sending data to server
                        postData(tab.index, `${SERVER_URL}/api/profile`, data);
                    });
                }, PAGE_LOAD_TIME);
            });
        });
    });
});

//function to scrape the content from linkedin profile
const scrapeProfileData = () => {
    const profileData = {
        name: document.getElementsByTagName("h1")[0]?.innerText || "No Name Found",
        location: document.querySelectorAll("span.text-body-small.inline.t-black--light.break-words")[0]?.innerText || "No Location Found",
        about: document.getElementById("about")?.nextElementSibling?.nextElementSibling?.querySelectorAll("span")[0]?.innerText || "No About Found",

        //linkedin do not have a bio field
        bio: "No Bio Found",

        //follower count of a linkedin user cannot be accessed
        followerCount: 0,
        connectionCount: parseInt(document.querySelectorAll("span.t-bold")[0]?.innerText?.split("+")[0]) || 0,
    };

    console.log("profileData: ", profileData); // For debugging
    return profileData;
}

//function to send data to the server
const postData = async (tabNum = 0, baseAPIUrl = "/", data = {}) => {
    try {
        if (!data) {
            console.error("No data provided to post details api");
            return;
        };

        const response = await fetch(baseAPIUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const data = await response.json();
        if (data.success) {
            console.log("Data posted successfully");
            alert(`${tabNum + 1} tab data posted successfully`);
        } else {
            console.log(err);
            console.error(`Error while posting details: ${err.message}`);
        };
    } catch (err) {
        console.log(err);
        console.error(`Error while posting details: ${err.message}`);
    };
}
