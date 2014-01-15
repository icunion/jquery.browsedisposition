(function($) {
  // Set up options and local state
  var defaultOptions = {
    timeout: 3600000, // Default timeout of one hour = 60 * 60 * 1000
  }
  var localState = {
    storageKey: 'browseDispositionRecord_' + location.host,
    dataFromStorage: false,
    loadTime: new Date().getTime(),
  }

  // Return a string corresponding to this page request which is invariant
  // on page refresh
  function pageHash() {
    return location.href + '_' + document.referrer;
  }

  // browseDisposition: determines whether this request constitutes a
  // first visit, page refresh, or site browse, and returns a string
  // corresponding to one of these three states.
  $.extend({
    browseDisposition: function(options) {
      var opts = $.extend({}, defaultOptions, options);
      
      if (localState.dataFromStorage) {
        var lastBrowse = localState.dataFromStorage
        if (localState.loadTime - lastBrowse.timestamp > opts.timeout) {
          // Last visit to site exceeds timeout, treat as first visit
          return "firstVisit";
        } else if (lastBrowse.hash == pageHash()) {
          // Page hash is the same, treat as refresh
          return "pageRefresh";
        } else {
          // Page hash is different, treat is site browse
          return "siteBrowse";
        }
      } else {
        // No data stored for this domain, therefore first visit
        return "firstVisit";
      }
      
      // Should have returned by now, return false if not
      return false;
    }
  });

  if (typeof(Storage) !== "undefined") {
    // Read the previous request's data from local storage if it exists
    if (localStorage[localState.storageKey]) {
      localState.dataFromStorage = JSON.parse(localStorage[localState.storageKey]);
    }

    // Save the current request's data to local storage, overwriting any
    // previous request's data
    localStorage[localState.storageKey] = JSON.stringify({
      hash: pageHash(),
      timestamp: new Date().getTime(),
    });

  } else {
    console.warn('jquery.browsedisposition requires local storage, which is not supported by your browser. All page requests will be treated as first visit.');
  }

  // Once page is ready trigger an event corresponding to the current browse
  // disposition
  $(function() {
    var browseDispositionResult = $.browseDisposition();
    if (browseDispositionResult) {
      $(document).trigger(browseDispositionResult);
    }
  });

})(jQuery);
