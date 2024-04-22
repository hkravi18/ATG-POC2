const PORT = 4000;
const PAGE_LOAD_TIME = 5000;

//TODO: Change the local server url to deployed server url
const SERVER_URL = `http://localhost:${PORT}`;

console.log("LinkedIn Profiles Extension!");

//function to scrape the content from linkedin profile
const scrapeProfileData = () => {
    const profileData = {
        name: document.getElementsByTagName("h1")[0]?.innerText || "No Name Found",
        location: document.querySelectorAll("span.text-body-small.inline.t-black--light.break-words")[0]?.innerText || "No Location Found",
        about: document.getElementById("about")?.nextElementSibling?.nextElementSibling?.querySelectorAll("span")[0]?.innerText || "No About Section Found",

        //linkedin do not have a bio field
        bio: "No Bio Found",

        //follower count of a linkedin user cannot be accessed
        followerCount: 0,
        connectionCount: parseInt(document.querySelectorAll("span.t-bold")[0]?.innerText?.split("+")[0]) || 0,
    };

    return profileData;
}

//function to send data to the server
const postData = async (data, baseAPIUrl) => {
    try {
        if (!data) {
            console.log("No data provided to post details api");
            return;
        };

        const response = await fetch(baseAPIUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const receivedData = await response.json();
        if (receivedData.success) {
            console.log("Data posted successfully");
            alert(`Data for profile ${data.url} posted successfully`);
        } else {
            console.log(`Error while posting details for ${data.url}: ${receivedData.error.message}`);
            alert(`Error while posting details for ${data.url}: ${receivedData.error.message}`);
        };
    } catch (err) {
        console.log(`Error while posting details for ${data.url}: ${err.message}`);
        alert(`Error while posting details for ${data.url}: ${err.message}`);
    };
}

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
                setTimeout(async () => {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        function: scrapeProfileData,
                    }, async (injectionResults) => {
                        const data = injectionResults[0].result;

                        //adding url to data 
                        data["url"] = url;

                        //sending data to server
                        await postData(data, `${SERVER_URL}/api/profile`);
                    });
                }, PAGE_LOAD_TIME);
            });
        });
    });
});
