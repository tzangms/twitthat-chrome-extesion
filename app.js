chrome.tabs.getSelected(null, function(tab) {
    var url = tab.url;
    var title = tab.title;

    url = 'http://twitthat.com/go'
        + '?url=' + url.replace(/%20/g, '+') 
        + '&title=' + encodeURI(title)
        + '&is_extension=1';

    var iframe = document.createElement("iframe");

    iframe.setAttribute("src", url);
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("style", "border:none; width:500px; height:350px");
    iframe.setAttribute("frameborder", "0");
    document.body.appendChild(iframe);
});
