// Get the value of the "answer" property of the element with ID "Input" and store it in a variable called "answer"
var answer = document.getElementById("Input").answer;

// Set a cookie with the name "myanswer" and the value of the "answer" variable
document.cookie = "myanswer=" + answer;

// Redirect the user to the page "./days/day1.html"
window.location = "./days/day1.html";

// Retrieve the value of the "myanswer" cookie
// This code assumes that the "myanswer" cookie has already been set
var answer = document.cookie
    // Split the cookie string into an array of individual cookies
    .split(";")
    // Find the cookie that starts with "myanswer="
    .find(cookie => cookie.startsWith("myanswer="))
    // Split the matching cookie string into an array using "=" as the separator and return the second element of this array, which is the value of the "myanswer" cookie
    .split("=")[1];

