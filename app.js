chrome.tabs.query({ currentWindow:true, highlighted : true }, function(tab) {
    var url = tab[0].url;
    var title = tab[0].title;

    url = 'https://twitthat.com/go'
        + '?url=' + encodeURIComponent(url)
        + '&title=' + encodeURI(title)
        + '&is_extension=1';

    var iframe = document.createElement("iframe");

    iframe.setAttribute("src", url);
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("style", "border:none; width:500px; height:350px");
    iframe.setAttribute("frameborder", "0");
    document.body.appendChild(iframe);
});
