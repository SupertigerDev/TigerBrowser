var selectedSearch = "google",
    google = $(".searchWithGoogle"),
    youtube = $(".searchWithYouTube"),
    searchBar = $(".searchBar");

$(document).ready(function () {

    setTimeout(() => {
        $(".searchWithGoogle").addClass("selectedGoogle")

        google.click(function () {
            if (selectedSearch == "google")
                return;
            selectedSearch = "google";
            $(".searchWith").removeClass("selectedYouTube")
            $(".searchWith").removeClass("searchWithHover")
            $(".searchWithYouTube").addClass("searchWithHover")
            $(".searchWithGoogle").addClass("selectedGoogle")
            searchBar.attr("placeholder", "Search with Google")
            searchBar.css("backgroundColor", "rgba(82, 151, 255, 0.178)")
        })

        youtube.click(function () {
            if (selectedSearch == "youtube")
                return;
            selectedSearch = "youtube";
            $(".searchWith").removeClass("searchWithHover")
            $(".searchWith").removeClass("selectedGoogle")
            $(".searchWithGoogle").addClass("searchWithHover")
            $(".searchWithYouTube").addClass("selectedYouTube")
            searchBar.attr("placeholder", "Search with YouTube")
            searchBar.css("backgroundColor", "rgba(255, 82, 82, 0.178)")
        })





    }, 200);

    searchBar.focusin(function (e) {
        console.log("focused")
        searchBar.animate({
            width: 400
        }, 100, function () {})
    })
    searchBar.focusout(function (e) {
        console.log("unfocused")
        searchBar.animate({
            width: 210
        }, 100, function () {})
    })

    searchBar.keyup(function (e) {
        if (e.keyCode == 13) {
            var val = urlencode(searchBar.val());
            searchBar.css("opacity", "0")

            setTimeout(() => {
                var tid = setTimeout(mycode, 200);
                var switchColor = 0

                function mycode() {
                    if (switchColor == 0){
                        searchBar.css("backgroundColor", "rgba(93, 255, 82, 0.178)")
                        searchBar.css("opacity", "1")
                        switchColor = 1
                    }else{
                        switchColor = 0
                        searchBar.css("opacity", "0")
                    }
                    tid = setTimeout(mycode, 1000);
                }

            }, 200);
            if (selectedSearch == "google") {
                document.location.href = "https://www.google.com/search?q=" + val
            } else if (selectedSearch == "youtube") {
                document.location.href = "https://www.youtube.com/results?search_query=" + val
            }

        }
    })


})


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