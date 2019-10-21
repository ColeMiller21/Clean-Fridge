var ingredients = [];
var search = $("#search-input").val();


var config = {
    apiKey: "AIzaSyCQZ4uWyQBdW-3HkHtG2O7EpsvmaXGlhdU",
    authDomain: "clean-fridge-6d073.firebaseapp.com",
    databaseURL: "https://clean-fridge-6d073.firebaseio.com",
    projectId: "clean-fridge-6d073",
    storageBucket: "clean-fridge-6d073.appspot.com",
    messagingSenderId: "956307004475",
    appId: "1:956307004475:web:4c1e878f1308b77bab101e",
    measurementId: "G-3VZZ2D07RL"
};
// Initialize Firebase
firebase.initializeApp(config);

var database = firebase.database();

var txtEmail = $("#email-input");
var txtPassword = $("#pw-input");
var btnLogin = $("#login-button");
var btnSignup = $("#signup-button");
var btnLogout = $("#logout-button");

// add login event

btnLogin.on("click", function (e) {
    event.preventDefault();
    var email = txtEmail.val();
    var password = txtPassword.val();
    var auth = firebase.auth();

    // Sign in
    var promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(console.log(e.message));

    $('.modal').modal('hide');
});

btnSignup.on("click", function (e) {
    event.preventDefault();
    console.log("clicked");
    email = txtEmail.val();
    password = txtPassword.val();
    auth = firebase.auth();

    // check for real email
    promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(console.log(e.message));

    $('.modal').modal('hide');
});

btnLogout.on("click", function (e) {
    console.log("logged out");
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(function (firebaseUser) {
    if (firebaseUser) {
        console.log(firebaseUser);
        $("#logout-button").css({
            "display": "block"
        });
        $("#signup-login-button").css({
            "display": "none"
        });
        //display logout button (hide to block);
    }
    else {
        console.log("not logged in");
        $("#logout-button").css({
            "display": "none"
        });
        $("#signup-login-button").css({
            "display": "block"
        });
    }
});


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