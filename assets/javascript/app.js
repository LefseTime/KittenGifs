window.onload = function () {

    let presets = ["Cute","Fluffy","Sleepy","Playful","Massage","Hug","Puppy"];
    for (i=0; i<presets.length; i++) {
        let button = $("<button>");
        button.text(presets[i]);
        console.log(presets[i]);
        button.attr("class","category");
        button.attr("data-search", presets[i]);
        $(".buttons").append(button);
    }

    //when search button clicked, add new category button
    $("#search-button").on("click", function() {

        //create empty button
        let newButton = $("<button>");
        //get val from search-text and store as var
        let searchTerm = $("#search-text").val();
        // console.log(searchTerm); works through here

        //add class category to newbutton
        newButton.attr('class', 'category');
        //.attr() val variable into "data-search"
        newButton.attr('data-search', searchTerm);
        // console.log(newButton.attr('data-search')); ok

        //.text val variable to display name of button
        newButton.text(searchTerm);
        //append button into .buttons div
        $(".buttons").append(newButton);
        //clear text from search box
        $("#search-text").val("");

        $(".category").on("click", function () {

            //set search to be the category of kitten that was clicked on
            let search = $(this).attr("data-search");
            //concatenate the category into the url
            let queryUrl = "https://api.giphy.com/v1/gifs/search?q=kitten+" + search + "&api_key=bkn8RHzlnmxiRIJ8MCkiQLGi9fAsFVjg&limit=10";
    
            //get data from api through ajax
            $.ajax({
                url: queryUrl,
                method: "GET"
            }).then(function (response) {
    
                let results = response.data;
    
                for (var i = 0; i < results.length; i++) {
    
                    //create div to hold each set of results to be displayed
                    let imageDiv = $("<div>");
                    //create tags for image, paragraph, and horizontal rule to put into imageDiv
                    let gif = $("<img>");
                    let p = $("<p>");
                    let hr = $("<hr>");
    
                    //set attribute of image tag to url
                    gif.attr(`src`, results[i].images.fixed_height_still.url);
                    gif.attr(`class`, `gif`);
                    gif.attr(`data-state`, `still`);
                    gif.attr(`data-still`, results[i].images.fixed_height_still.url);
                    gif.attr(`data-animate`, results[i].images.fixed_height.url);
                    //set text of p tag to rating
                    p.text(`Rating: ${results[i].rating}`);
    
                    //append the gif, p and hr tags into imageDiv
                    $(imageDiv).append(gif);
                    $(imageDiv).append(p);
                    $(imageDiv).append(hr);
    
                    //prepend imageDiv into the div with id gifs in the html document
                    $("#gifs").prepend(imageDiv);
                }
    
                // function eachGif() {
                //     console.log(results.url);
                //     let gif = $("<img>");
                //     // let p = $("<p>");
    
                //How do you tell it to go into each results thing... still use []? what do you put inside?
                //     gif.attr("src", results.url);
    
                //     $(".buttons").append(gif);
                // }
    
                // results.forEach(eachGif); 
    
                //when a gif is clicked
                $(".gif").on("click", function () {
    
                    let clickedGif = $(this);
                    let state = clickedGif.attr("data-state");
    
                    if (state === 'still') {
                        clickedGif.attr('data-state', 'animate');
                        clickedGif.attr('src', clickedGif.attr('data-animate'));
                    };
    
                    if (state === 'animate') {
                        clickedGif.attr('data-state', 'still');
                        clickedGif.attr('src', clickedGif.attr('data-still'));
                    };
    
                });
            });
        });

    })

    //when a category button is clicked
    $(".category").on("click", function () {

        //set search to be the category of kitten that was clicked on
        let search = $(this).attr("data-search");
        //concatenate the category into the url
        let queryUrl = "https://api.giphy.com/v1/gifs/search?q=kitten+" + search + "&api_key=bkn8RHzlnmxiRIJ8MCkiQLGi9fAsFVjg&limit=10";

        //get data from api through ajax
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {

            let results = response.data;

            for (var i = 0; i < results.length; i++) {

                //create div to hold each set of results to be displayed
                let imageDiv = $("<div>");
                //create tags for image, paragraph, and horizontal rule to put into imageDiv
                let gif = $("<img>");
                let p = $("<p>");
                let hr = $("<hr>");

                //set attribute of image tag to url
                gif.attr(`src`, results[i].images.fixed_height_still.url);
                gif.attr(`class`, `gif`);
                gif.attr(`data-state`, `still`);
                gif.attr(`data-still`, results[i].images.fixed_height_still.url);
                gif.attr(`data-animate`, results[i].images.fixed_height.url);
                //set text of p tag to rating
                p.text(`Rating: ${results[i].rating}`);

                //append the gif, p and hr tags into imageDiv
                $(imageDiv).append(gif);
                $(imageDiv).append(p);
                $(imageDiv).append(hr);

                //prepend imageDiv into the div with id gifs in the html document
                $("#gifs").prepend(imageDiv);
            }

            // function eachGif() {
            //     console.log(results.url);
            //     let gif = $("<img>");
            //     // let p = $("<p>");

            //How do you tell it to go into each results thing... still use []? what do you put inside?
            //     gif.attr("src", results.url);

            //     $(".buttons").append(gif);
            // }

            // results.forEach(eachGif); 

            //when a gif is clicked
            $(".gif").on("click", function () {

                let clickedGif = $(this);
                let state = clickedGif.attr("data-state");

                if (state === 'still') {
                    clickedGif.attr('data-state', 'animate');
                    clickedGif.attr('src', clickedGif.attr('data-animate'));
                };

                if (state === 'animate') {
                    clickedGif.attr('data-state', 'still');
                    clickedGif.attr('src', clickedGif.attr('data-still'));
                };

            });
        });
    });
};
