const tldjs = require('tldjs');

const { tldExists } = tldjs;
var back = document.getElementById("navigateBack"),
    forward = document.getElementById("navigateForward"),
    view = document.getElementById("view"),
    omni = document.getElementById("addressBarInput"),
    requestedURL = "tiger:newtab";
    view.style.backgroundColor = "rgb(46, 46, 46)";




    $(document).ready(function(){
        view.loadURL(__dirname + "/customPages/newtab/index.html")
        omni.value = ""
    })


function reloadView () {
    view.reload();
}

function backView () {
    view.goBack ();
}

function forwardView () {
    view.goForward();
}


omni.onkeypress = function(event){updateURL(event)}
back.onclick = function(){backView();}
forward.onclick = function(){forwardView();}

view.addEventListener('did-navigate', function(event){updateAddressBar(event)})

//view.addEventListener('did-stop-loading', function(event){console.log(event)})

//view.addEventListener('did-finish-load', function(event){console.log(event)})

view.addEventListener('did-fail-load', function(event){failLoadPage(event)})


function failLoadPage(event) {
    var errorDescription = event.errorDescription;
    var errorCode = event.errorCode;
    var validatedURL = event.validatedURL;
    console.log("Failed to load page: " + errorDescription + " - TODO: Add error page.")

}

function updateAddressBar(event) {
    if (requestedURL.toLowerCase().startsWith("tiger:")){
        if (requestedURL.trim().toLowerCase() == "tiger:newtab"){
            omni.value = "";
            return;
        }
        omni.value = requestedURL;
        return;
    }
    view.style.backgroundColor = "white";
    omni.value = event.url;
    
}

function updateURL (event) {  
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
            if (val.toLowerCase().startsWith("tiger:")){
                var pageToLoad = __dirname + "/customPages/" + val.substring(6).toLowerCase() +"/index.html"
                view.loadURL(pageToLoad);
                omni.value = val;  
                requestedURL = val  
                return;
            }
            if (tldExists(val) == false) {
                val = urlencode(val)
                val = "https://www.google.com/search?q="+ val
                view.loadURL(val);
                omni.value = val;
                requestedURL = val
            }else{
                view.loadURL('http://'+ val);
                omni.value = 'http://'+ val;
                requestedURL = 'http://'+ val
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
    return escape(str).replace(/([@*+/]|%26(amp|lt|gt)%3B)/g, function (m) { return symbols[m]; });
 }