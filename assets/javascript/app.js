var ingredients = [];
var search = $("#search-input").val();


// search button click to display ingredients div
$("#search-button").on("click", function () {
    event.preventDefault();
    console.log("submit-clicked");

    $("#recipie-div").css({
        "display": "block"
    })
    //appending the original page to ingredients div, everything css will be applied here
    $("#ing-div").append($("#ingredients-container"));
    //css to display the ingredients div from display: none
    $("#ing-div").css({
        "display": "block"
    });
    //takes the input bar away
    $("#full-input").css({
        "display": "none"
    })
    $("#ingredients-container").css({
        "padding": "10px"
    })

});


//appending the search into <p> tag and pushing it into ingredients array

$("#button-addon2").on("click", function () {
    event.preventDefault();
    search = $("#search-input").val();
    console.log(search);
    //pushing search into ingredients array
    ingredients.push(search);
    console.log(ingredients)


    //create var for p tag add classes??
    //then append p.search?

    $("#ingredients-text").append("<p>" + search + "</p>");
    //after click is performed clears input field
    $("#search-input").val("");
});

//allowing enter key to be pressed to do click function for add button
$("#search-input").keyup(function (e) {
    if (e.which == 13) {
        $("#button-addon2").click();
    }
});