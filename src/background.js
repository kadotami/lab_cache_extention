if (!window.localStorage) {
  alert("お使いのブラウザはlocalstorageに対応してません。");
}
var user = {}
chrome.browserAction.onClicked.addListener(function(tab){
  chrome.storage.local.get(function(items) {
    user = {
      'quiche_oauth_token': items.quiche_oauth_token,
      'quiche_oauth_token_secret': items.quiche_oauth_token_secret,
      'quiche_twitter_id': items.quiche_twitter_id,
      'quiche_twitter_image_url': items.quiche_twitter_image_url
    }
  });
  if ( user.quiche_oauth_token == null
    || user.quiche_oauth_token_secret == null
    || user.quiche_twitter_id == null
    || user.quiche_twitter_image_url == null
    ){
    OAuth.initialize('XXXXXXXXXXXXXXXXXXXXX');
    OAuth.popup("twitter", function(error, result) {
      console.log(error)
      console.log("oauth_token: " + result.oauth_token);
      console.log("oauth_token_secret: " + result.oauth_token_secret);
      result.get('/1.1/account/verify_credentials.json').done(function(data) {
        alert('Hello ' + data.screen_name);
        user = {
          'quiche_oauth_token': result.oauth_token,
          'quiche_oauth_token_secret': result.oauth_token_secret,
          'quiche_twitter_id': data.screen_name,
          'quiche_twitter_image_url': data.profile_image_url
        }
        chrome.storage.local.set(user, function(){
          console.log('user has been saved to localStorage');
        });
        post_to_server(tab, user);
      });
    });
  }else{
    post_to_server(tab, user);
  }
});

function post_to_server(tab, user) {
  var data = {
    'title': tab.title,
    'url': tab.url,
    'user': {
      'quiche_oauth_token': user.quiche_oauth_token,
      'quiche_twitter_id': user.quiche_twitter_id,
      'quiche_twitter_image_url': user.quiche_twitter_image_url,
    }
  }
  $.ajax({
    url: 'http://0.0.0.0:3000/item/create',
    type: 'post',
    data: data,
  })
  .done(function( data ) {
    alert(JSON.stringify(data));
  })
  .fail(function( jqXHR, textStatus, errorThrown ) {
    alert(errorThrown);
  });
}