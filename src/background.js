chrome.browserAction.onClicked.addListener(function(tab){

  // chrome.tabs.getAllInWindow(null, function (tabs) {
  //   for (var i = 0; i < tabs.length; i++) {
  //     var info = "id:" + tabs[i].id + "\n"
  //     + "index:" + tabs[i].index + "\n"
  //     + "windowId:" + tabs[i].windowId + "\n"
  //     + "openerTabId:" + tabs[i].openerTabId + "\n"
  //     + "selected:" + tabs[i].selected + "\n"
  //     + "highlighted:" + tabs[i].highlighted + "\n"
  //     + "active:" + tabs[i].active + "\n"
  //     + "pinned:" + tabs[i].pinned + "\n"
  //     + "url:" + tabs[i].url + "\n"
  //     + "title:" + tabs[i].title + "\n"
  //     + "favIconUrl:" + tabs[i].favIconUrl  + "\n"
  //     + "status:" + tabs[i].status + "\n"
  //     + "incognito:" + tabs[i].incognito + "\n"
  //     + "width:" + tabs[i].width + "\n"
  //     + "height:" + tabs[i].height + "\n"
  //     + "sessionId:" + tabs[i].sessionId + "\n";
  //     alert(info);
  //   }
  // })

  var data = {
    'title': tab.title,
    'url': tab.url,
    'user': {
      'name': 'test',
      'email': 'hogehoge',
    }
  }

  $.ajax({
    url: 'http://0.0.0.0:3000/item/create',
    type: 'post',
    data: data,
  })
  .done(function( data ) {
    // alert(JSON.stringify(data));
    // chrome.tabs.executeScript(null,{
    //   'code': 'document.body.innerHTML('+data.content_html+')'
    // })
  })
  .fail(function( jqXHR, textStatus, errorThrown ) {
    alert(errorThrown);
  });
});