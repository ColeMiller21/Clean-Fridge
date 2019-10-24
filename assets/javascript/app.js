// Firebase authentication

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
// Initialize Firebase
firebase.initializeApp(config);

var database = firebase.database();

var txtEmail = $("#email-input");
var txtPassword = $("#pw-input");
var btnLogin = $("#login-button");
var btnSignup = $("#signup-button");
var btnLogout = $("#logout-button");
var btnSave = $("#save-button");
var userId;
var userEmail;
var userDisplayName;
var dietVal;
var ingredients = [];
var apiURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=";
var ingredientsStr = '';
var ingredientsURL = apiURL + ingredientsStr;
const API_KEY = "1c0efba3e0msh9d91195fcad438ap1d2f7djsnffb6016a1181";


// Log in button 

btnLogin.on("click", function (e) {
    event.preventDefault();
    var email = txtEmail.val();
    var password = txtPassword.val();
    var auth = firebase.auth();

    // Sign in
    var promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(console.log(e.message));

});

// Sign up button click
btnSignup.on("click", function (e) {
    event.preventDefault();
    console.log("clicked");
    email = txtEmail.val();
    password = txtPassword.val();
    auth = firebase.auth();

    // check for real email
    promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(console.log(e.message));
    txtPassword.val("");
    txtEmail.val("");


});

// Logout button click
btnLogout.on("click", function (e) {
    console.log("logged out");
    firebase.auth().signOut();
    $("#navbarDropdown").hide();
});

// User state change if else functions
firebase.auth().onAuthStateChanged(function (firebaseUser) {
    if (firebaseUser) {
        console.log(firebaseUser);


        $("#dropdown-text").text(firebaseUser.email);
        $("#navbarDropdown").css({
            "display": "block"
        });
        $("#signup-login-button").css({
            "display": "none"
        });

        userId = firebaseUser.uid;
        userEmail = firebaseUser.email;
        userDisplayName = firebaseUser.displayName;

        //pushing to firebase to save user data.
        // Save changes button click
        $("#save-button").on("click", function () {
            userDisplayName = $("#displayName-input").val();
            console.log("display name " + userDisplayName);
            dietVal = $("input[name='diet']:checked").val();
            console.log("diet preference " + dietVal);


            database.ref("users/" + userId).set({
                userId: userId,
                userEmail: userEmail,
                displayName: userDisplayName,
                dietVal: dietVal
            });

        });
    } else {
        console.log("not logged in");
        $("#navbarDropdown").css({
            "display": "hide"
        });
        $("#signup-login-button").css({
            "display": "block"
        });
    }
});





function toStringify() {
    ingredientsStr = ingredients.join(',');
    console.log(ingredientsStr);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" + ingredientsStr,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": API_KEY,
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);

        for (var i = 0; i < response.length; i++) {
            console.log(response[i]);

            var recipeDiv = $("<div>");
            recipeDiv.addClass("recipe-div");
            var image = $("<img>");
            image.addClass("img-thumbnail");
            image.attr("src", response[i].image);
            var title = $("<p>");
            title.text(response[i].title);

            recipeDiv.append(title);
            recipeDiv.append(image);

        }
    });
};

// search button click to display ingredients div
$("#search-button").on("click", function () {
    event.preventDefault();
    console.log("submit-clicked");

    $("#recipie-div").css({
        "display": "block"
    })
    //appending the original page to ingredients div, everything css will be applied here
    $("#ing-div").append($("#ingredients-container"));
    //css to display the ingredients div from display: none
    $("#ing-div").css({
        "display": "block"
    });
    //takes the input bar away
    $("#full-input").css({
        "display": "none"
    })
    $("#ingredients-container").css({
        "padding": "10px"
    })

});


//Function that 


//appending the search into <p> tag and pushing it into ingredients array

$("#button-addon2").on("click", function () {
    event.preventDefault();
    search = $("#search-input").val();
    console.log(search);
    //pushing search into ingredients array
    ingredients.push(search);
    console.log(ingredients);

    //create var for p tag add classes??
    //then append p.search?

    $("#ingredients-text").append("<p>" + search + "</p>");
    //after click is performed clears input field
    $("#search-input").val("");
});

//allowing enter key to be pressed to do click function for add button
$("#search-input").keyup(function (e) {
    if (e.which == 13) {
        $("#button-addon2").click();
    }
});