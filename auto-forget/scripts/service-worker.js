console.log('service-worker.js');

const filter = {
  url: [
    {
      urlMatches: 'https://google.com/',
    },
  ],
};

chrome.webNavigation.onCompleted.addListener(() => {
  console.info("The user has loaded my favorite website!");

  chrome.history.search({
        'text': 'google.com',              // Return every history item....
        // 'startTime': oneWeekAgo  // that was accessed less than one week ago.
      },
      function (historyItems) {
        // For each history item, get details on all visits.
        for (var i = 0; i < historyItems.length; ++i) {
          var url = historyItems[i].url;

          var ty = Object.prototype.toString.call(url);
          chrome.history.deleteUrl({
            "url": url
          }).then( () => {
            console.log(`Url was removed!`);
          })

          // var processVisitsWithUrl = function(url) {
          //   // We need the url of the visited item to process the visit.
          //   // Use a closure to bind the  url into the callback's args.
          //   return function(visitItems) {
          //     processVisits(url, visitItems);
          //   };
          // };
          // chrome.history.getVisits({url: url}, processVisitsWithUrl(url));
          // numRequestsOutstanding++;
        }
        // if (!numRequestsOutstanding) {
        //   onAllVisitsProcessed();
        // }
      });

}, filter);

// chrome.tabs.onRemoved.addListener(function(tabid, removed) {
//   console.log(`The tab ${tabid} has been closed!`);
// })

/*
chrome.windows.onRemoved.addListener(function(windowid) {
 alert("window closed")
})



chrome.action.onClicked.addListener(handleActionClick);

chrome.storage.local.get(["badgeText"], ({ badgeText }) => {
  chrome.action.setBadgeText({ text: badgeText });
});
 */