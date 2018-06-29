const tldjs = require('tldjs');

const {
    tldExists
} = tldjs;
var back = document.getElementById("navigateBack"),
    forward = document.getElementById("navigateForward"),
    view,
    omni = document.getElementById("addressBarInput"),
    tabsPanel = document.getElementById("tabsPanel"),
    requestedURL = "tiger:newtab";




$(document).ready(function () {
    $(".webPage").html('<webview id="view" src="' + __dirname + "/customPages/newtab/index.html" + '"></webview>')

    view = document.getElementById("view")

    view.addEventListener('did-navigate', function (event) {
        updateAddressBar(event)
        //openDevTools()
    })

    //view.addEventListener('did-stop-loading', function(event){console.log(event)})

    view.addEventListener('did-finish-load', function (event) {
        finishLoadingPage()
    })

    view.addEventListener('did-fail-load', function (event) {
        failLoadPage(event)
    })

    omni.value = ""

})


function reloadView() {
    view.reload();
}

function backView() {
    view.goBack();
}

function forwardView() {
    view.goForward();
}

function getTitle() {
    return view.getTitle()
}

function getFavicon(link) {
    return "https://www.google.com/s2/favicons?domain=" + link;
}

function openDevTools() {
    view.openDevTools();
}


omni.onkeypress = function (event) {
    updateURL(event)
}
back.onclick = function () {
    backView();
}
forward.onclick = function () {
    forwardView();
}


function finishLoadingPage(event) {
    var favicon = getFavicon(view.getURL())
    var title = getTitle();

    tabsPanel.innerHTML = '<div class="tab"><img class="tabFavicon" src = "'+favicon+'"><div class="tabTitle">'+title+'</div></div>'
}


function failLoadPage(event) {
    var errorDescription = event.errorDescription;
    var errorCode = event.errorCode;
    var validatedURL = event.validatedURL;
    console.log("Failed to load page: " + errorDescription + " - TODO: Add error page.")

}

function updateAddressBar(event) {



    if (event.url.startsWith(urlencodePath("file:///" + __dirname.replace(/\\/g, "/") + "/customPages"))) {
        if (event.url.includes("newtab")) {
            omni.value = ""
            return;
        }
        omni.value = requestedURL;
        return
    }

    view.style.backgroundColor = "white";
    omni.value = event.url;

}

function updateURL(event) {
    if (event.keyCode === 13) {
        omni.blur();
        let val = omni.value;
        let https = val.slice(0, 8).toLowerCase();
        let http = val.slice(0, 7).toLowerCase();
        if (https === 'https://') {
            view.loadURL(val);
        } else if (http === 'http://') {
            view.loadURL(val);
            omni.value = val;
        } else {
            if (val.toLowerCase().startsWith("tiger:")) {
                var pageToLoad = __dirname + "/customPages/" + val.substring(6).toLowerCase() + "/index.html"
                view.loadURL(pageToLoad);
                omni.value = val;
                requestedURL = val
                return;
            }
            if (tldExists(val) == false) {
                val = urlencode(val)
                val = "https://www.google.com/search?q=" + val
                view.loadURL(val);
                omni.value = val;
                requestedURL = val
            } else {
                view.loadURL('http://' + val);
                omni.value = 'http://' + val;
                requestedURL = 'http://' + val
            }

        }
    }
}

function urlencode(str) {
    var symbols = {
        '@': '%40',
        '%26amp%3B': '%26',
        '*': '%2A',
        '+': '%2B',
        '/': '%2F',
        '%26lt%3B': '%3C',
        '%26gt%3B': '%3E'
    };
    return escape(str).replace(/([@*+/]|%26(amp|lt|gt)%3B)/g, function (m) {
        return symbols[m];
    });
}

function urlencodePath(str) {
    str = str.split(' ').join('%20');

    return str
}