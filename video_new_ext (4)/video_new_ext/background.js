console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>")
function senddata(key_1, data) {
  console.log("first")
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log(tabs)
    chrome.tabs.sendMessage(tabs[0].id, {
      message: key_1,
      value: data
    })
  })
}

function extractDomain(url) {
  var domain;
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  }
  else {
    domain = url.split('/')[0];
  }
  // Find and remove the port number
  domain = domain.split(':')[0];
  return domain;
}

// Check if the tab has finished loading
chrome.tabs.onUpdated.addListener(
  function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
      console.log(changeInfo.url, "for  chaandwdwdw>>>")
      console.log("Loading.............");
      senddata("for_all_tabs_1", 2.5);
      var currentDomain = extractDomain(tab.url);
      chrome.storage.local.get('storedDomain', function (result) {
        var storedDomain = result.storedDomain;
        if (currentDomain !== storedDomain) {
          console.log("Clear the local storage");
          chrome.storage.local.clear(function () {
            console.log('Local storage cleared.');
            chrome.runtime.onMessage.addListener(function(req){
              console.log(req)
              if (req.message==="popup_open") {
                console.log("geeting the message...");
                chrome.runtime.sendMessage({
                  message: "clear_storage"
                })
              }
            })

            
            chrome.storage.local.set({ 'storedDomain': currentDomain }, function () {
              console.log('Stored domain updated: ' + currentDomain);
            });
            /// Message sending to popup window;;;
            chrome.runtime.sendMessage({ message: "storage_clear" });
            chrome.storage.local.set({ 'data_on': true }, function () {

            });
          });
        }
      });

    }
  }
);


chrome.runtime.onMessage.addListener(function (req) {
  if (req.message === "hostname") {
    console.log(req.value);
    let a = req.value;

    chrome.runtime.sendMessage({
      message: "hostdata",
      value: a
    })
  }
})

