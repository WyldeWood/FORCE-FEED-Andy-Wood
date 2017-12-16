/* Contains function from: http://stackoverflow.com/questions/237104/array-containsobj-in-javascript
*/


var tweets = new Object();  // keeps track of tweets that we have

function ajaxrequest(){
    $.ajax({
        type: 'GET',
        url: 'http://api.thelounge.sx/forcefeed',
        success: function(result){ 
            for (var i = 0; i < result.length; i++) {
                if (tweets[result[i].id]==undefined){
                    tweets[result[i].id] = true;    // makes it so result[i].id is defined and thus is never added again
                    addsingletweet(result[i]);  // dispatch the function that modifies HTML
                }
            }
        }
    });
}
function addsingletweet(tweet){ // Appends the users profile photo, user name, and tweet to the div and then writes it to the html file
$('#Tweets').prepend(
"<div id='Tweet'>"
+"<img src=\"" +  tweet.user.profile_image_url.replace("_normal", "") + "\" />"
+ "<a href="+ tweet.user.url + ">" + tweet.user.screen_name + "</a>" // im not sure if this is the right url but it was the only one I could find in the json, also some user's tweets dont have user names attached to them for some reason.
+ "<p>" + tweet.text + "</p>")
+ "</div>";
}

var interval = setInterval(ajaxrequest, 5000);
